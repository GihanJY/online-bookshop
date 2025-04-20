import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';

const userSchema = new Schema({
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
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await compare(candidatePassword, this.password);
};

export default model('User', userSchema);