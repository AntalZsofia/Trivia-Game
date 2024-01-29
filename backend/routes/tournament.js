const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const { createTournament } = require('../controllers/tournament');

router.post('/create', createTournament);