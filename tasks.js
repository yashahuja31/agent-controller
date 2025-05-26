// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//   agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
//   tasks: [{
//     FirstName: String,
//     Phone: Number,
//     Notes: String
//   }]
// });

// module.exports = mongoose.model('Task', taskSchema);


const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent' },
  tasks: [
    {
      FirstName: String,
      Phone: String,
      Notes: String
    }
  ]
});

module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema);
