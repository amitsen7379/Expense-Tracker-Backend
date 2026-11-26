const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/goals', require('./routes/goals')); // यह लाइन जोड़ें

// MongoDB Connection & Server Start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:21017/expensetracker'; // या Atlas URI

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected...');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.log(err));
