const express = require('express');
const router = express.Router();
let fetch;
import('node-fetch').then(nodeFetch => {
    fetch = nodeFetch.default;
  });
const Token = require('../models/Token');

const { saveToken } = require('../controllers/token');



router.post('/save_token', saveToken);

module.exports = router;