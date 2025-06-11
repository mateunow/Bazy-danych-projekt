const express  = require('express');
const router   = express.Router();
const Resource = require('../models/Resource');

// CREATE
router.post('/', async (req, res) => {
  try {
    const r = await Resource.create(req.body);
    res.status(201).json(r);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// READ all
router.get('/', async (req, res) => {
  const list = await Resource.find();
  res.json(list);
});

// READ one
router.get('/:id', async (req, res) => {
  try {
    const r = await Resource.findById(req.params.id);
    if (!r) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json(r);
  } catch {
    res.status(400).json({ error: 'Nieprawidłowe ID' });
  }
});

// UPDATE
router.put('/:id', async (req, res) => {
  try {
    const r = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!r) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json(r);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const r = await Resource.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ error: 'Nie znaleziono' });
    res.json({ msg: 'Usunięto' });
  } catch {
    res.status(400).json({ error: 'Nieprawidłowe ID' });
  }
});

module.exports = router;
