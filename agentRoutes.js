const router = require('express').Router();
const Task = require('../models/tasks');
const Agent = require('../models/agent');

router.get('/tasks', async (req, res) => {
  try {
    const agents = await Agent.find();
    const tasks = await Task.find().populate('agentId', 'name email');

    const result = agents.map(agent => {
      const agentTasks = tasks.find(task => task.agentId._id.toString() === agent._id.toString());
      return {
        agent: { name: agent.name, email: agent.email },
        tasks: agentTasks ? agentTasks.tasks : []
      };
    });

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
});

module.exports = router;
