// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const qrRoutes = require('./routes/qr');
const scanRoutes = require('./routes/scan');

// Import routes
const authRoutes = require('./routes/authRoutes');
const membershipRoutes = require('./routes/membershipRoutes');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/qr', qrRoutes);
app.use('/api', scanRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/membership', membershipRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Rawfit-Club', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
