const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true},
  date: { type: Date, required: true},
  photo: { type: String, required: true},
  price: { type: Number, required: true},
  location: { type: String, required: true},
  userId: { type: String, required: true, ref: 'User'}
});

module.exports = mongoose.model('Ad', adSchema);