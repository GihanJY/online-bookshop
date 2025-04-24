const Book = require('../models/book');

/**
 * @desc    Get all books
 * @route   GET /api/books
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with list of all books or error
 */
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


/**
 * @desc    Get a book by ID
 * @route   GET /api/books/:id
 * @param   {Object} req - Express request object with book ID in params
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with book data or error
 */
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Create a new book
 * @route   POST /api/books
 * @param   {Object} req - Express request object containing book details in the body
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with success message and newly created book data or error
 */
const createBook = async (req, res) => {
    try {
        const { title, author, description, price, isbn, image, category, stock, createdAt } = req.body;

        if (!title || !author || !description || !price || !isbn || !image || !category || !stock || !createdAt) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingBook = await Book.findOne({ title });

        if (existingBook) {
            return res.status(400).json({ message: 'Book already exists.' });
        }

        const newBook = new Book({ title, author, description, price, isbn, image, category, stock, createdAt });
        await newBook.save();

        res.status(201).json({ message: 'Book registered successfully', book: newBook });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Update an existing book
 * @route   PUT /api/books/:id
 * @param   {Object} req - Express request object with book ID in params and updated data in body
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with updated book data or error
 */
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedBook = await Book.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

/**
 * @desc    Delete a book
 * @route   DELETE /api/books/:id
 * @param   {Object} req - Express request object with book ID in params
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response confirming deletion or error
 */
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
