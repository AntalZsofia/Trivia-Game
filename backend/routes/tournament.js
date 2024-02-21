const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const { getFriendsTournaments, 
        getUserTournaments, 
        createTournament, 
        updateTournamentName, 
        inviteFriend,
        getTournamentById,
        updateTournamentParticipants } = require('../controllers/tournament');

router.get('/friends', getFriendsTournaments);
router.get('/user', getUserTournaments);
router.post('/create', createTournament);
router.put('/update', updateTournamentName);
router.put('/invite', inviteFriend);
router.get('/:tournamentId', getTournamentById);
router.put('/:tournamentId', updateTournamentParticipants);


module.exports = router;