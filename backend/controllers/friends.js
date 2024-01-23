const express = require('express');
const fetch = require('node-fetch');
const User = require('../models/User');


//find user by name
const findUser = async (req, res) => {
    const { username } = req.body;

    try {
        const user = await User.findOne({ username: { $regex: username, $options: 'i' } });
    
    if(!user){
        return res.status(404).json({ error: 'User not found.' });

    }
    res.status(200).json(user);
    } catch(err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while searching for user.' });
    }
};


//send friend request
const sendRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        const receiver = await User.findById(receiverId);

        if(receiver.FriendRequests.includes(senderId)){
            return res.status(400).json({ error: 'Friend request already sent.' });
        }

        receiver.FriendRequests.push(senderId);
        await receiver.save();

        res.status(200).json({ message: 'Friend request sent.' });
    } catch(err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while sending friend request.' });
    }
};

module.exports = { findUser, sendRequest };