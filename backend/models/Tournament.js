const mongoose = require('mongoose');
const TournamentSchema = new mongoose.Schema({
    name: String,
    category: String,
    difficulty: String,
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    users: [{
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        },
        score: {
            type: Number,
            default: 0
        }
    }]
    });

module.exports = mongoose.model('Tournament', TournamentSchema);