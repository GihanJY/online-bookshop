import { Router } from 'express';
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/bookController';

const router = Router();

router.post('/register', createBook);// Create new book
router.get('/', getAllBooks);// Get all books
router.get('/:id', getBookById);// Get single book by ID
router.put('/:id', updateBook);// Update book by ID
router.delete('/:id', deleteBook);// Delete book by ID

export default router;