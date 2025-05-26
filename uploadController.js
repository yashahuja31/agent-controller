const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');
const Agent = require('../models/agent');
const Assignment = require('../models/assignment');

exports.uploadFile = async (req, res) => { //uploading of the csv file
  const agents = await Agent.find();
  if (agents.length < 1) return res.status(400).json({ message: 'No agents found' });

  let records = [];
  const ext = req.file.originalname.split('.').pop();

  if (['csv'].includes(ext)) {
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', row => records.push(row))
      .on('end', async () => {
        await distribute(records, agents);
        res.json({ message: 'Records distributed' });
      });
  } else if (['xlsx', 'xls'].includes(ext)) {
    const workbook = xlsx.readFile(req.file.path);
    const sheet = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    await distribute(sheet, agents);
    res.json({ message: 'Records distributed' });
  } else {
    return res.status(400).json({ message: 'Invalid file format' });
  }
};

async function distribute(records, agents) { // distribution of the user
  const perAgent = Math.floor(records.length / agents.length);
  let extra = records.length % agents.length;
  let start = 0;

  for (const agent of agents) {
    const count = perAgent + (extra-- > 0 ? 1 : 0);
    const assigned = records.slice(start, start + count);
    await Assignment.create({ agentId: agent._id, data: assigned });
    start += count;
  }
}
