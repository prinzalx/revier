const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Multer Konfiguration für Bildupload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// MongoDB Verbindung
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB verbunden'))
    .catch(err => console.log('MongoDB Verbindungsfehler:', err));

// Modelle
const Image = require('./models/Image');

// Routen
app.get('/api', (req, res) => {
    res.send('Willkommen bei der Revier API');
});

// GET alle Bilder/Notizen
app.get('/api/images', async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (err) {
        console.error('Error fetching images:', err);
        res.status(500).json({ message: err.message });
    }
});

// POST neues Bild/Notiz
app.post('/api/images', upload.single('image'), async (req, res) => {
    console.log('Received image upload request');
    console.log('Request body:', req.body);
    console.log('File:', req.file);

    try {
        const image = new Image({
            description: req.body.description,
            latitude: parseFloat(req.body.latitude),
            longitude: parseFloat(req.body.longitude),
            url: req.file ? `/uploads/${req.file.filename}` : null,
            notes: req.body.text ? [{ text: req.body.text }] : []
        });

        const newImage = await image.save();
        console.log('Saved new image:', newImage);
        res.status(201).json(newImage);
    } catch (err) {
        console.error('Error saving image:', err);
        res.status(500).json({ message: err.message });
    }
});

// GET einzelnes Bild/Notiz
app.get('/api/images/:id', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Bild/Notiz nicht gefunden' });
        }
        res.json(image);
    } catch (err) {
        console.error('Error fetching single image:', err);
        res.status(500).json({ message: err.message });
    }
});

// PUT/PATCH Bild/Notiz aktualisieren
app.put('/api/images/:id', async (req, res) => {
    try {
        const updatedImage = await Image.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedImage) {
            return res.status(404).json({ message: 'Bild/Notiz nicht gefunden' });
        }
        res.json(updatedImage);
    } catch (err) {
        console.error('Error updating image:', err);
        res.status(400).json({ message: err.message });
    }
});

// DELETE Bild/Notiz löschen
app.delete('/api/images/:id', async (req, res) => {
    try {
        const deletedImage = await Image.findByIdAndDelete(req.params.id);
        if (!deletedImage) {
            return res.status(404).json({ message: 'Bild/Notiz nicht gefunden' });
        }
        res.json({ message: 'Bild/Notiz gelöscht' });
    } catch (err) {
        console.error('Error deleting image:', err);
        res.status(500).json({ message: err.message });
    }
});

// POST Notiz zu Bild hinzufügen
app.post('/api/images/:id/notes', async (req, res) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ message: 'Bild/Notiz nicht gefunden' });
        }
        image.notes.push({ text: req.body.text });
        const updatedImage = await image.save();
        res.json(updatedImage);
    } catch (err) {
        console.error('Error adding note to image:', err);
        res.status(400).json({ message: err.message });
    }
});

// DELETE Notiz löschen
app.delete('/api/images/:imageId/notes/:noteId', async (req, res) => {
    try {
        const image = await Image.findById(req.params.imageId);
        if (!image) {
            return res.status(404).json({ message: 'Bild/Notiz nicht gefunden' });
        }
        image.notes = image.notes.filter(note => note._id.toString() !== req.params.noteId);
        const updatedImage = await image.save();
        res.json(updatedImage);
    } catch (err) {
        console.error('Error deleting note from image:', err);
        res.status(400).json({ message: err.message });
    }
});

// Serve SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Server starten
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
