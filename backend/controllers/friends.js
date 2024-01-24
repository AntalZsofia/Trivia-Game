const express = require('express');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const User = require('../models/User');


//all friends
const allFriends = async (req, res) => {
   const authHeader = req.headers.authorization;

   if(!authHeader || !authHeader.startsWith('Bearer ')){
         return res.status(401).json({ error: 'Invalid token.' });
    }
   const token = authHeader.split(' ')[1];

   try{
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId
    ;
    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
    const friends = await User.find({ _id: { $in: user.Friends } });
    
    res.status(200).json(friends);
   }catch(err){
         console.error('Error:', err);
         res.status(500).json({ error: 'An error occurred while fetching friends.' });
}
};


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
//get all pending requests
const getAllRequests = async (req, res) => {
    
try {
    const userId = req.params.userId;

    const user = await User.find(userId);
    if(!user){
        return res.status(404).json({ error: 'User not found.' });
    }

    const requests = await User.find({ _id: { $in: user.FriendRequests } });
    if(!requests){
        return res.status(404).json({ error: 'No pending requests.' });
    }
    res.status(200).json(requests);
}
catch(err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred while fetching requests.' });
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

//Accept friend request
const acceptRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if(!receiver.FriendRequests.includes(senderId)){
            return res.status(400).json({ error: 'No friend request from this user.' });
        }

        sender.Friends.push(receiverId);
        receiver.Friends.push(senderId);
        sender.FriendRequests = sender.FriendRequests.filter((request) => request.toString() !== receiverId.toString());
        await sender.save();
        await receiver.save();

        res.status(200).json({ message: 'Friend request accepted.' });
    } catch(err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while accepting friend request.' });
    }
};


module.exports = { allFriends, findUser, getAllRequests, sendRequest, acceptRequest };