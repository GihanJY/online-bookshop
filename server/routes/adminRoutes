const { Router } = require('express');
const { getAdminById, createAdmin, updateAdmin, deleteAdmin, loginAdmin } = require('../controllers/adminController');

const router = Router();

router.post('/', createAdmin);// Create new admin
router.post('/login', loginAdmin);// Login admin
router.get('/:id', getAdminById);// Get single admin by ID
router.put('/:id', updateAdmin);// Update admin by ID
router.delete('/:id', deleteAdmin);// Delete admin by ID

module.exports = router;