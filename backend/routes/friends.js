const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { findUser, sendRequest } = require('../controllers/friends');


router.get('/findUser', findUser);
router.post('/sendRequest', sendRequest );
router.post('/acceptRequest', );
router.post('/declineRequest', );

module.exports = router;