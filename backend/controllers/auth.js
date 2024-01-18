const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../models/User');


//Register a new user
const register = async (req, res) => {
    const { username, email, password, avatar } = req.body;

    try{
        const hash = crypto.createHash('sha256')
        hash.update(password);
        const hashedPassword = hash.digest('hex');
        console.log('Hashed password: ', hashedPassword);
        const user = new User({ username, email, password: hashedPassword, avatar });
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
const login = async (req, res, next) => {
    const { username, password } = req.body;
    console.log('from line 30', req.body);
    console.log('Password received:', password);

    try {
        const user = await User.findOne({ username });
        if(!user){
            return res.status(404).json({ error: 'User not found.' });
        }
        console.log('User found:', user);

        console.log('Comparing passwords...');
        const passwordMatch = await user.comparePassword(password);
        console.log('Passwords match:', passwordMatch);
        if(!passwordMatch){
            return res.status(401).json({ error: 'Wrong password.' });
        }

        console.log('Signing token...');
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });
        console.log('Token signed:', token);
        res.json({token})
        }
    catch (err) {
        console.error(err);
        next(err);
    };
    }
    module.exports = { register, login };