const express = require('express');
const router = express.Router();
let fetch;
import('node-fetch').then(nodeFetch => {
    fetch = nodeFetch.default;
  });
const { allMessages, sendMessage, deleteMessage } = require('../controllers/message');


router.get('/all', allMessages);
router.post('/send', sendMessage);
router.delete('/delete/:messageId', deleteMessage);


module.exports = router;