const express = require('express');
const authenticate = require('../middlewares/auth');
const User = require('../models/User');
const { update } = require('../controllers/user');
const { details } = require('../controllers/user');

const router = express.Router();

router.get('/details', authenticate, details);
router.put('/update', update);

// router.get('/details', authenticate, async (req, res) => {
//     try{
//         const user = await User.findById(req.user._id);
//         res.json(user);
//     }catch(err){
//         res.status(400).json({error: err.message});
//     }
// });   

module.exports = router;