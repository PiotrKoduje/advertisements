const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  login: { type: String, required: true },
  pass: { type: String, required: true},
  avatar: { type: String, required: false},
  phone: { type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);