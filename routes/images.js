const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Image = require('../models/Image');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const images = await Image.find();
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/location', async (req, res) => {
    try {
        const { latitude, longitude } = req.query;
        const images = await Image.find({ 
            latitude: parseFloat(latitude), 
            longitude: parseFloat(longitude) 
        });
        res.json(images);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', upload.single('image'), async (req, res) => {
    const image = new Image({
        url: `/uploads/${req.file.filename}`,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    try {
        const newImage = await image.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedImage = await Image.findByIdAndUpdate(
            req.params.id, 
            { description: req.body.description },
            { new: true }
        );
        res.json(updatedImage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Image.findByIdAndDelete(req.params.id);
        res.json({ message: 'Image deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;