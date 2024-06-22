const express = require('express');
const router = express.Router();
const Image = require('../models/Image');

module.exports = function(upload) {
    // GET alle Bilder
    router.get('/', async (req, res) => {
        try {
            const images = await Image.find();
            res.json(images);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // POST neues Bild
    router.post('/', upload.single('image'), async (req, res) => {
        const image = new Image({
            description: req.body.description,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            url: `/uploads/${req.file.filename}`
        });

        try {
            const newImage = await image.save();
            res.status(201).json(newImage);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // GET einzelnes Bild
    router.get('/:id', getImage, (req, res) => {
        res.json(res.image);
    });

    // DELETE Bild
    router.delete('/:id', getImage, async (req, res) => {
        try {
            await res.image.remove();
            res.json({ message: 'Bild gelöscht' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    async function getImage(req, res, next) {
        try {
            const image = await Image.findById(req.params.id);
            if (image == null) {
                return res.status(404).json({ message: 'Bild nicht gefunden' });
            }
            res.image = image;
            next();
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    return router;
};