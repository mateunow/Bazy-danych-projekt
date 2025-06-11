const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  type:          { type: String, enum: ['create','cancel','fail','update'], required: true },
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User',        required: true },
  reservationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation', required: true },
  timestamp:     { type: Date, default: Date.now },
  description:   { type: String, default: '' }
});

module.exports = mongoose.model('Log', logSchema);
