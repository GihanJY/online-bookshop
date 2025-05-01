const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const { route } = require('../routes/adminRoutes');

/**
 * @desc    Create a new admin
 * @route   POST /api/admin
 * @param   {Object} req - Express request object containing admin details in the body
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with success message and newly created admin data or error
 */
const createAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Validate required fields
        if (!username || !email || !password) {
            return res.status(400).json({ 
                success: false,
                message: 'All fields are required' 
            });
        }

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ $or: [{ email }, { username }] });
        if (existingAdmin) {
            return res.status(400).json({
                success: false,
                message: 'Admin with this email or username already exists'
            });
        }

        // Create new admin
        const newAdmin = new Admin({
            username,
            email,
            password
        });

        await newAdmin.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: newAdmin._id, role: 'admin' },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(201).json({
            success: true,
            message: 'Admin created successfully',
            data: {
                id: newAdmin._id,
                username: newAdmin.username,
                email: newAdmin.email,
                token
            }
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { username, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required'});
        }

        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(401).json({ message: 'Invalid credentials'});
        }

        const isPasswordValid = await admin.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials'});
        }

        const token = jwt.sign({ id: admin._id, role: 'admin'}, process.env.JWT_SECRET, { expiresIn: '1d'});

        res.status(200).json({ message: 'Admin logged in successfully', token});
    } catch (error) {
        console.error('Error logging in admin:', error);
        res.status(500).json({ message: 'Server error'});
    }
}

/**
 * @desc    Get admin by ID
 * @route   GET /api/admin/:id
 * @param   {Object} req - Express request object containing admin ID in params
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with admin data or error
 */
const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id).select('-password');
        
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        res.status(200).json({
            success: true,
            data: admin
        });
    } catch (error) {
        console.error('Error fetching admin:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

/**
 * @desc    Update admin by ID
 * @route   PUT /api/admin/:id
 * @param   {Object} req - Express request object containing admin ID in params and update data in body
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with updated admin data or error
 */
const updateAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const admin = await Admin.findById(req.params.id);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        // Update fields if provided
        if (username) admin.username = username;
        if (email) admin.email = email;
        if (password) {
            admin.password = password;
        }

        await admin.save();

        res.status(200).json({
            success: true,
            message: 'Admin updated successfully',
            data: {
                id: admin._id,
                username: admin.username,
                email: admin.email
            }
        });
    } catch (error) {
        console.error('Error updating admin:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

/**
 * @desc    Delete admin by ID
 * @route   DELETE /api/admin/:id
 * @param   {Object} req - Express request object containing admin ID in params
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with success message or error
 */
const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Admin deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting admin:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    createAdmin,
    loginAdmin,
    getAdminById,
    updateAdmin,
    deleteAdmin
};