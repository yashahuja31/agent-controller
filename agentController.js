// const Agent = require('../models/Agent');

// exports.addAgent = async (req, res) => { // to add an agent detail to the csv file
//   const { name, email, mobile, password } = req.body;
//   const agent = new Agent({ name, email, mobile, password });
//   await agent.save();
//   res.status(201).json(agent);
// };

// exports.getAgents = async (req, res) => { // to retrieve details of an agent stored prior in the csv file
//   const agents = await Agent.find();
//   res.json(agents);
// };


const Agent = require('../models/Agent');

exports.addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const agent = new Agent({ name, email, mobile, password });
    await agent.save();
    res.status(201).json({ message: 'Agent added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add agent' });
  }
};
