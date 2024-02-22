const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const { allFriends, getNonParticipants, findUser, getSentRequests, getReceivedRequests, sendRequest, acceptRequest, declineRequest } = require('../controllers/friends');

router.get('/all', allFriends);
router.get('/nonparticipants/:tournamentId', getNonParticipants);
router.get('/findUser', findUser);
router.get('/requests/sent/:userId', getSentRequests);
router.get('/requests/received/:userId', getReceivedRequests);
router.post('/send_request', sendRequest );
router.post('/acceptRequest', acceptRequest );
router.post('/declineRequest', declineRequest);

module.exports = router;