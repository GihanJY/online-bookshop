const { Schema, default: mongoose } = require('mongoose');

const bookSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 150,
  },
  author: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    trim: true,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', bookSchema);
