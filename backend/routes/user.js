const express = require('express');
const authenticate = require('../middlewares/auth');
const User = require('../models/User');
const { update } = require('../controllers/user');
const { details } = require('../controllers/user');
const { updateAvatar } = require('../controllers/user')
const { get } = require('mongoose');
const { getUserById } = require('../controllers/user');

const router = express.Router();

router.get('/details', authenticate, details);
router.put('/update', authenticate, update);
router.put('/avatar/update', authenticate, updateAvatar);
router.get('/:id', getUserById, (req, res) => res.json(req.user));


module.exports = router;