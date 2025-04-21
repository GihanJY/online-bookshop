const { Router } = require('express');
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');

const router = Router();

router.post('/register', createBook);// Create new book
router.get('/', getAllBooks);// Get all books
router.get('/:id', getBookById);// Get single book by ID
router.put('/:id', updateBook);// Update book by ID
router.delete('/:id', deleteBook);// Delete book by ID

module.exports = router;