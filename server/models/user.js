const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        maxlength: 15,
        unique: false,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        maxlength: 20,
        unique: false,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        maxlength: 254,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        maxlength: 128,
        unique: false,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);