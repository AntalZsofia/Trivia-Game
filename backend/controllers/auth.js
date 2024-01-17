const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');


//Register a new user
const register = async (req, res) => {
    const { username, email, password } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.json({ message: 'User created successfully.' });
    }
    catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ error: 'Email already in use.' });
        } else {
            console.error(err);
            res.status(500).json({ error: 'Error registering new user.' });
        }
    
    }
};

//Login an existing user
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if(!user){
            return res.status(404).json({ error: 'User not found.' });
        }

        const passwordMatch = await user.comparePassword(password);
        if(!passwordMatch){
            return res.status(401).json({ error: 'Wrong password.' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        res.json({token})
        }
    catch (err) {
        console.error(err);
        next(err);
    };
    }
    module.exports = { register, login };