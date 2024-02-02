// models/Token.js
const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  token: String,
  userId: String,
});

module.exports = mongoose.model('Token', TokenSchema);