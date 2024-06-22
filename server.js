const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Image = require('./models/Image');
const Note = require('./models/Note');

app.get('/api/images', async (req, res) => {
    const images = await Image.find();
    res.json(images);
});

app.get('/api/images/location', async (req, res) => {
    const { latitude, longitude } = req.query;
    const images = await Image.find({ 
        latitude: parseFloat(latitude), 
        longitude: parseFloat(longitude) 
    });
    res.json(images);
});

app.post('/api/images', upload.single('image'), async (req, res) => {
    const image = new Image({
        url: `/uploads/${req.file.filename}`,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });
    const newImage = await image.save();
    res.status(201).json(newImage);
});

app.delete('/api/images/:id', async (req, res) => {
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted' });
});

app.get('/api/notes', async (req, res) => {
    const notes = await Note.find();
    res.json(notes);
});

app.post('/api/notes', async (req, res) => {
    const note = new Note(req.body);
    const newNote = await note.save();
    res.status(201).json(newNote);
});

app.patch('/api/notes/:id', async (req, res) => {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedNote);
});

app.delete('/api/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: 'Note deleted' });
});

app.delete('/api/deleteAll', async (req, res) => {
    await Image.deleteMany({});
    await Note.deleteMany({});
    res.json({ message: 'All data deleted' });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));