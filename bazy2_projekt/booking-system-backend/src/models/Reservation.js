const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User',     required: true },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
  startTime:  { type: Date, required: true },
  endTime:    { type: Date, required: true },
  status:     { type: String, enum: ['active','cancelled','completed'], default: 'active' },
  createdAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reservation', reservationSchema);
