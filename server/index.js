const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

const adminRoutes = require('./routes/adminRoutes.js');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use(cookieParser());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());

app.use((req, res, next) => {
    res.cookie('bookstore_token', 'cookieValue', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    next();
});

app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(error => console.error('MongoDB connection error: ', error));

// Root route
app.get('/', (req, res) => {
    res.send('Online Bookshop API');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});