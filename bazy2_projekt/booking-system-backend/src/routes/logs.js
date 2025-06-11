const express = require('express');
const router  = express.Router();
const Log     = require('../models/Log');

// CREATE
router.post('/', async (req, res) => {
  try {
    const l = await Log.create(req.body);
    res.status(201).json(l);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// READ all
router.get('/', async (req, res) => {
  const list = await Log.find();
  res.json(list);
});

// READ one
router.get('/:id', async (req, res) => {
  try {
    const l = await Log.findById(req.params.id);
    if (!l) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json(l);
  } catch {
    res.status(400).json({ error: 'Nieprawidłowe ID' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const l = await Log.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!l) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json(l);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const l = await Log.findByIdAndDelete(req.params.id);
    if (!l) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json({ msg: 'Usunięto' });
  } catch {
    res.status(400).json({ error: 'Nieprawidłowe ID' });
  }
});

module.exports = router;
