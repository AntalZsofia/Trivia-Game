const express = require('express');
const router = express.Router();
let fetch;
import('node-fetch').then(nodeFetch => {
        fetch = nodeFetch.default;
      });

const { getFriendsTournaments, 
        getUserTournaments, 
        createTournament, 
        updateTournamentName, 
        inviteFriend,
        getTournamentById,
        updateTournamentParticipants,
        deleteTournament } = require('../controllers/tournament');

router.get('/friends', getFriendsTournaments);
router.get('/user', getUserTournaments);
router.post('/create', createTournament);
router.put('/update', updateTournamentName);
router.put('/invite', inviteFriend);
router.get('/:tournamentId', getTournamentById);
router.put('/:tournamentId', updateTournamentParticipants);
router.delete('/delete/:tournamentId', deleteTournament);


module.exports = router;