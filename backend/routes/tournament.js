const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const { createTournament, updateTournamentName, inviteFriend } = require('../controllers/tournament');

router.post('/create', createTournament);
router.put('/update', updateTournamentName);
router.put('/invite', inviteFriend);

module.exports = router;