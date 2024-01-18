const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = async (req, res, next) => {
    console.log('Authorization header:', req.headers.authorization);
    const token = req.headers.authorization?.split(' ')[1];
    console.log('Extracted token:', token);
    if(!token){
        return res.status(401).json({ error: 'Authentication required.' });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId);
        if(!user){
            return res.status(404).json({ error: 'No user found.' });
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.error('JWT verification error:', err.message);
        res.status(401).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticate;