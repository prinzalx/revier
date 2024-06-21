const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const imageSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        // Nicht required, da es auch Notizen ohne Bild geben kann
    },
    notes: [noteSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Image', imageSchema);
