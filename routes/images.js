const express = require('express');
const router = express.Router();
const Image = require('../models/Image');
const multer = require('multer');
const path = require('path');
const ExifParser = require('exif-parser');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

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
  const { latitude, longitude, description } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  let metadata = {};
  try {
    const buffer = fs.readFileSync(file.path);
    const parser = ExifParser.create(buffer);
    const result = parser.parse();
    metadata = {
      cameraMake: result.tags.Make,
      cameraModel: result.tags.Model,
      dateTaken: result.tags.DateTimeOriginal,
      exposureTime: result.tags.ExposureTime,
      fNumber: result.tags.FNumber,
      iso: result.tags.ISO,
      focalLength: result.tags.FocalLength
    };
  } catch (error) {
    console.error('Error parsing EXIF data:', error);
  }

  const image = new Image({
    url: `/uploads/${file.filename}`,
    description,
    latitude,
    longitude,
    metadata
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

// PATCH Bild aktualisieren
router.patch('/:id', getImage, async (req, res) => {
  if (req.body.description != null) {
    res.image.description = req.body.description;
  }
  if (req.body.latitude != null) {
    res.image.latitude = req.body.latitude;
  }
  if (req.body.longitude != null) {
    res.image.longitude = req.body.longitude;
  }

  try {
    const updatedImage = await res.image.save();
    res.json(updatedImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE Bild löschen
router.delete('/:id', getImage, async (req, res) => {
  try {
    await res.image.remove();
    res.json({ message: 'Bild gelöscht' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST Notiz hinzufügen
router.post('/:id/notes', getImage, async (req, res) => {
  res.image.notes.push({ text: req.body.text });
  try {
    const updatedImage = await res.image.save();
    res.status(201).json(updatedImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE Notiz löschen
router.delete('/:id/notes/:noteId', getImage, async (req, res) => {
  res.image.notes = res.image.notes.filter(note => note._id.toString() !== req.params.noteId);
  try {
    const updatedImage = await res.image.save();
    res.json(updatedImage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Middleware
async function getImage(req, res, next) {
  let image;
  try {
    image = await Image.findById(req.params.id);
    if (image == null) {
      return res.status(404).json({ message: 'Bild nicht gefunden' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.image = image;
  next();
}

module.exports = router;
