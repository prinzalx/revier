const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const imageRoutes = require('./routes/images');
const noteRoutes = require('./routes/notes');

app.use('/api/images', imageRoutes);
app.use('/api/notes', noteRoutes);

app.delete('/api/deleteAll', async (req, res) => {
    try {
        await mongoose.connection.db.dropDatabase();
        res.json({ message: 'All data deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));