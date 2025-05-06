const { Router } = require('express');
const { loginUser, logoutUser, registerUser, getCart, getAllUsers, getUserById, updateUser, deleteUser, updateCart } = require('../controllers/userController');

const router = Router();

router.post('/register', registerUser); // Create a new user
router.post('/login', loginUser); // Login user
router.get('/logout', logoutUser); // Logout user
router.get('/cart', getCart);
router.post('/cart', updateCart);
router.get('/', getAllUsers); // Get all users
router.get('/:id', getUserById); // Get user by ID
router.put('/:id', updateUser); // Update user by ID
router.delete('/:id', deleteUser); // Delete user by ID

module.exports = router;