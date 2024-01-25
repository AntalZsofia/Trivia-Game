const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { allFriends, findUser, getAllRequests, sendRequest, acceptRequest, declineRequest } = require('../controllers/friends');

router.get('/all', allFriends);
router.get('/findUser', findUser);
router.get('/requests', getAllRequests);
router.post('/sendRequest', sendRequest );
router.post('/acceptRequest', acceptRequest );
router.post('/declineRequest', declineRequest);

module.exports = router;