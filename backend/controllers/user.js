const User = require('../models/User');
//const authenticate = require('../middlewares/auth');

const details = async (req, res) => {
    try{
        const user = await User.findById(req.user._id);
        res.json(user);
        console.log(user);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const update = async (req, res) => {
    const { totalPoints, gamesPlayed } = req.body;
    try{
        const user = await User.findByIdAndUpdate(req.user._id, { totalPoints, gamesPlayed }, { new: true });
        res.json(user);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}


module.exports = { details, update };