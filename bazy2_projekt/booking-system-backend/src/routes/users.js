const express = require('express');
const router  = express.Router();
const User    = require('../models/User');

// CREATE
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// READ all
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// READ one
router.get('/:id', async (req, res) => {
  try {
    const u = await User.findById(req.params.id);
    if (!u) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json(u);
  } catch {
    res.status(400).json({ error: 'Nieprawidłowe ID' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const u = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!u) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json(u);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const u = await User.findByIdAndDelete(req.params.id);
    if (!u) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json({ msg: 'Usunięto' });
  } catch {
    res.status(400).json({ error: 'Nieprawidłowe ID' });
  }
});

module.exports = router;
