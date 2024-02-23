const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    Sender: String,
    Message: String,
    Recipients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    date: {
        type: Date,
        default: Date.now
    },
    Type: {
        type: String
    },
    Data: {
        type: mongoose.Schema.Types.Mixed

    }
});
module.exports = mongoose.model('Message', MessageSchema);
