const User = require("../models/user");
const jwt = require("jsonwebtoken");

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @param   {Object} req - Express request object containing firstName, lastName, email, password
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with success message and user data or error
 */
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Set HTTP-only cookie
    res.cookie("bookstore_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, guestCart } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Initialize user.cart if it doesn't exist
    if (!user.cart) {
      user.cart = [];
    }

    // Merge guest cart if available
    if (guestCart && Array.isArray(guestCart)) {
      // Assuming your User model has a "cart" array field
      const mergedCart = [...user.cart];

      guestCart.forEach((guestItem) => {
        const index = mergedCart.findIndex(
          (item) => item.productId === guestItem.productId
        );

        if (index >= 0) {
          // Update quantity if item exists
          mergedCart[index].quantity += guestItem.quantity;
        } else {
          mergedCart.push(guestItem);
        }
      });

      user.cart = mergedCart;
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Set HTTP-only cookie
    res.cookie("bookstore_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        cart: user.cart
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// In your userRoutes.js
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ cart: user.cart || [] });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { bookId, title, quantity } = req.body;
    const user = await User.findById(req.user.userId);
    
    if (!user.cart) user.cart = [];
    
    const index = user.cart.findIndex(item => item.bookId === bookId);
    
    if (index >= 0) {
      user.cart[index].quantity += quantity;
    } else {
      user.cart.push({ bookId, title, quantity });
    }
    
    await user.save();
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/users/logout
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response confirming logout
 */
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("bookstore_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with list of users or error
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @param   {Object} req - Express request object with user ID in params
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with user data or error
 */
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Update user details
 * @route   PUT /api/users/:id
 * @param   {Object} req - Express request object with user ID and updated data
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response with updated user or error
 */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    if (password) user.password = password;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * @desc    Delete a user
 * @route   DELETE /api/users/:id
 * @access  Admin
 * @param   {Object} req - Express request object with user ID in params
 * @param   {Object} res - Express response object
 * @returns {Object} JSON response confirming deletion or error
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCart,
  updateCart,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
