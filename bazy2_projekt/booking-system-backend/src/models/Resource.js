const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  type:      { type: String, enum: ['sala','pokój','stanowisko'], required: true },
  location:  { type: String, required: true },
  capacity:  { type: Number, required: true },
  features:  { type: [String], default: [] },
  isActive:  { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', resourceSchema);
