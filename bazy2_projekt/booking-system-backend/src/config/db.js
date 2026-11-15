const mongoose = require('mongoose');

const DEFAULT_MONGO_URI = 'mongodb://127.0.0.1:27017/booking_system';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || DEFAULT_MONGO_URI);
    console.log('✔️ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
