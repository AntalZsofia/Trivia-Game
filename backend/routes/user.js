const express = require('express');
const authenticate = require('../middlewares/auth');
const User = require('../models/User');
const { update } = require('../controllers/user');
const { details } = require('../controllers/user');

const router = express.Router();

router.get('/details', authenticate, details);
router.put('/update', authenticate, update);


module.exports = router;