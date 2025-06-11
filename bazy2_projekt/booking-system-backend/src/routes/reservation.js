const express     = require('express');
const router      = express.Router();
const Reservation = require('../models/Reservation');
const mongoose = require('mongoose');
const User = require('../models/User');
const Resource = require('../models/Resource');
const Log = require('../models/Log');

// CREATE
router.post('/', async (req, res) => {
  try {
    const v = await Reservation.create(req.body);
    res.status(201).json(v);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Rezerwacja z transakcją
router.post('/safe', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { userId, resourceId, startTime, endTime } = req.body;

    // Sprawdź limit dzienny użytkownika
    const user = await User.findById(userId).session(session);
    if (!user) throw new Error('Nie znaleziono użytkownika');

    const startOfDay = new Date(startTime);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(startTime);
    endOfDay.setUTCHours(23, 59, 59, 999);

    const todayReservations = await Reservation.countDocuments({
      userId,
      startTime: { $gte: startOfDay, $lte: endOfDay },
    }).session(session);

    if (todayReservations >= user.dailyReservationLimit) {
      throw new Error('Przekroczono dzienny limit rezerwacji');
    }

    // Sprawdź kolizje czasowe
    const conflict = await Reservation.findOne({
      resourceId,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
      ]
    }).session(session);

    if (conflict) {
      throw new Error('Zasób już zajęty w tym czasie');
    }

    // Utwórz rezerwację
    const reservation = await Reservation.create([{ userId, resourceId, startTime, endTime }], { session });

    // Zaloguj operację
    await Log.create([{
      type: 'create',
      userId,
      reservationId: reservation[0]._id,
      description: 'Rezerwacja utworzona przez transakcję'
    }], { session });

    await session.commitTransaction();
    res.status(201).json(reservation[0]);

  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
});

// READ all
router.get('/', async (req, res) => {
  const list = await Reservation.find();
  res.json(list);
});

// READ one
router.get('/:id', async (req, res) => {
  try {
    const v = await Reservation.findById(req.params.id);
    if (!v) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json(v);
  } catch {
    res.status(400).json({ error: 'Nieprawidłowe ID' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const v = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!v) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json(v);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const v = await Reservation.findByIdAndDelete(req.params.id);
    if (!v) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json({ msg: 'Usunięto' });
  } catch {
    res.status(400).json({ error: 'Nieprawidłowe ID' });
  }
});




module.exports = router;
