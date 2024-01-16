const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    totalPoints: Number,
    Tournaments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament'
    }]
    });

module.exports = mongoose.model('User', UserSchema);