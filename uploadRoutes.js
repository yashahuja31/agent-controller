// backend/routes/uploadRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const Agent = require('../models/agent');
const Task = require('../models/tasks');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Multer file filter
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.csv', '.xlsx', '.xls'].includes(ext)) {
      return cb(new Error('Only .csv, .xlsx, .xls files are allowed'));
    }
    cb(null, true);
  }
});

// Upload and distribute tasks
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Parse uploaded file
    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet); // Expecting [{ FirstName, Phone, Notes }, ...]

    if (!jsonData.length) {
      fs.unlinkSync(file.path);
      return res.status(400).json({ message: 'Uploaded file is empty or invalid format' });
    }

    // Fetch agents
    const agents = await Agent.find();
    if (agents.length < 5) {
      fs.unlinkSync(file.path);
      return res.status(400).json({ message: 'Not enough agents (need at least 5)' });
    }

    // Distribute data among 5 agents
    const distributed = Array.from({ length: 5 }, () => []);
    jsonData.forEach((item, index) => {
      const agentIndex = index % 5;
      distributed[agentIndex].push(item);
    });

    // Clear old tasks (optional)
    await Task.deleteMany({});

    // Save new tasks
    for (let i = 0; i < 5; i++) {
      await new Task({
        agentId: agents[i]._id,
        tasks: distributed[i],
      }).save();
    }

    // Clean up uploaded file
    fs.unlinkSync(file.path);

    return res.status(200).json({ message: 'Tasks distributed and saved successfully' });

  } catch (err) {
    console.error('Upload Error:', err.message);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
