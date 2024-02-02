const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const Token = require('../models/Token');

const { saveToken } = require('../controllers/token');



router.post('/save_token', saveToken);

module.exports = router;