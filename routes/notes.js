const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET alle Notizen
router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST neue Notiz
router.post('/', async (req, res) => {
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

// GET einzelne Notiz
router.get('/:id', getNote, (req, res) => {
    res.json(res.note);
});

// PATCH Notiz aktualisieren
router.patch('/:id', getNote, async (req, res) => {
    if (req.body.text != null) {
        res.note.text = req.body.text;
    }
    try {
        const updatedNote = await res.note.save();
        res.json(updatedNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE Notiz
router.delete('/:id', getNote, async (req, res) => {
    try {
        await res.note.remove();
        res.json({ message: 'Notiz gelöscht' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getNote(req, res, next) {
    try {
        const note = await Note.findById(req.params.id);
        if (note == null) {
            return res.status(404).json({ message: 'Notiz nicht gefunden' });
        }
        res.note = note;
        next();
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = router;
