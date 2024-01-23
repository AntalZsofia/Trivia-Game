const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { allFriends, findUser, sendRequest } = require('../controllers/friends');

router.get('/all', allFriends);
router.get('/findUser', findUser);
router.post('/sendRequest', sendRequest );
router.post('/acceptRequest', );
router.post('/declineRequest', );

module.exports = router;