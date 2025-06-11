const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:                 { type: String, required: true },
  email:                { type: String, required: true, unique: true },
  role:                 { type: String, enum: ['user','admin'], default: 'user' },
  dailyReservationLimit:{ type: Number, default: 1 },
  createdAt:            { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
