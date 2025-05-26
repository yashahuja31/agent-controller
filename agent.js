const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  mobile: String,
  password: String,
});

module.exports = mongoose.models.Agent || mongoose.model('Agent', agentSchema);
