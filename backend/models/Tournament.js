const mongoose = require('mongoose');
const TournamentSchema = new mongoose.Schema({
    name: String,
    category: String,
    difficulty: String,
    type: String,
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
    });

module.exports = mongoose.model('Tournament', TournamentSchema);