const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const crypto = require('crypto');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a username.'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter an email.'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
    },
    avatar: {
        type: String,
        default: 'default-avatar-url'
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    totalPoints: {
        type: Number,
        default: 0
    },
    gamesPlayed: {
        type: Number,
        default: 0
    },
    Tournaments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
    }]
    });

  
  // Compare the given password with the hashed password in the database
  UserSchema.methods.comparePassword = function (password) {
    const hash = crypto.createHash('sha256');
    hash.update(password);
    const hashedPassword = hash.digest('hex');
    console.log('Provided password hash:', hashedPassword);
    console.log('Stored password hash:', this.password);
    return this.password === hashedPassword;
  };

module.exports = mongoose.model('User', UserSchema);