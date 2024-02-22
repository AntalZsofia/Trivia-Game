const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { allMessages, sendMessage, deleteMessage } = require('../controllers/message');


router.get('/all', allMessages);
router.post('/send', sendMessage);
router.delete('/delete/:messageId', deleteMessage);


module.exports = router;