const mongoose = require('mongoose');
const TournamentSchema = new mongoose.Schema({
    name: String,
    category: String,
    difficulty: String,
    totalQuestions: Number,
    questions: [{
        correctAnswers: Number,
        category: String,
        difficulty: String,
        points: Number,
        question: String,
        correct_answer: String,
        incorrect_answers: [String]
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