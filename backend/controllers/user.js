const User = require('../models/User');
//const authenticate = require('../middlewares/auth');

const details = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.json(user);
        console.log(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const update = async (req, res) => {
    const { totalPoints, gamesPlayed } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.user._id, { totalPoints, gamesPlayed }, { new: true });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
//update avatar image
const updateAvatar = async (req, res) => {
    const { avatar } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found." })
        }
        user.avatar = avatar;
        await user.save();
        res.status(200).json({ message: "Avatar updated successfully." });
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating avatar.' });
    }

}



const getUserById = async (req, res, next, id) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(400).json({ error: 'User not found.' });
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }

}

module.exports = { details, update, getUserById, updateAvatar };