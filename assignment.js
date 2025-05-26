const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  data: [
    {
      firstName: String,
      phone: String,
      notes: String
    }
  ]
});

module.exports = mongoose.model('Assignment', assignmentSchema);
