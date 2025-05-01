const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('MongoDB connection error: ', error));

const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Online Bookshop API');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});