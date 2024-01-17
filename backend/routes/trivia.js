const express = require('express');
const { surprise, quiz } = require('../controllers/trivia');

const router = express.Router();

router.get('/surprise', surprise);
router.get('/quiz', quiz);

module.exports = router;