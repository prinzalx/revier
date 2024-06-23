const express = require('express');
const router = express.Router();
const Image = require('../models/Image');
const { validateCoordinates } = require('../utils/validation');

module.exports = function(upload) {
    router.get('/', async (req, res) => {
        try {
            const images = await Image.find();
            res.json(images);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    router.post('/', upload.single('image'), async (req, res) => {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        if (!validateCoordinates(req.body.latitude, req.body.longitude)) {
            return res.status(400).json({ message: 'Invalid coordinates' });
        }

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

    router.delete('/:id', async (req, res) => {
        try {
            const image = await Image.findById(req.params.id);
            if (!image) return res.status(404).json({ message: 'Image not found' });

            await image.remove();
            res.json({ message: 'Image deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    return router;
};