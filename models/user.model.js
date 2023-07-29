const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, default: null },
    profile_picture: { type: String, default: null },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },
}, { timestamps: true });

const user = mongoose.model('users', userSchema);
module.exports = user;