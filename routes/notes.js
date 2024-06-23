const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { validateCoordinates } = require('../utils/validation');

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    if (!validateCoordinates(req.body.latitude, req.body.longitude)) {
        return res.status(400).json({ message: 'Invalid coordinates' });
    }

    const note = new Note({
        text: req.body.text,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });

        if (req.body.text) {
            note.text = req.body.text;
        }

        const updatedNote = await note.save();
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });

        await note.remove();
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;