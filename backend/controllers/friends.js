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
    const { username } = req.query;

    try {
        const users = await User.find({ username: { $regex: username, $options: 'i' } });
    
    if(!users || users.length === 0){
        return res.status(404).json({ error: 'No users found.' });

    }
    return res.status(200).json(users);
    } catch(err) {
        console.error('Error:', err);
       return res.status(500).json({ error: 'An error occurred while searching for user.' });
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

    const receivedRequests = await User.find({ _id: { $in: user.ReceivedFriendRequests } });
    const sentRequests = await User.find({ _id: { $in: user.SentFriendRequests } });

    const requests = receivedRequests.concat(sentRequests);

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
        const sender = await User.findById(senderId);

        if(!sender){
            return res.status(404).json({ error: 'User not found.' });
        }
        
        if(!receiver){
            return res.status(404).json({ error: 'User not found.' });
        }
        
        if(receiver.ReceivedFriendRequests.includes(senderId)){
            return res.status(400).json({ error: 'Friend request already sent.' });
        }

        receiver.ReceivedFriendRequests.push(senderId);
        sender.SentFriendRequests.push(receiverId);
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

        if(!receiver.ReceivedFriendRequests.includes(senderId)){
            return res.status(400).json({ error: 'No friend request from this user.' });
        }

        sender.Friends.push(receiverId);
        receiver.Friends.push(senderId);
        sender.SentFriendRequests = sender.FriendRequests.filter((request) => request.toString() !== receiverId.toString());
        receiver.ReceivedFriendRequests = receiver.FriendRequests.filter((request) => request.toString() !== senderId.toString());
        await sender.save();
        await receiver.save();

        res.status(200).json({ message: 'Friend request accepted.' });
    } catch(err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while accepting friend request.' });
    }
};

//Decline friend request
const declineRequest = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender) {
            return res.status(404).json({ error: 'Sender not found.' });
        }

        if (!receiver) {
            return res.status(404).json({ error: 'Receiver not found.' });
        }

        if(!receiver.ReceivedFriendRequests.includes(senderId)){
            return res.status(400).json({ error: 'No friend request from this user.' });
        }

        sender.SentFriendRequests = sender.SentFriendRequests.filter((request) => request.toString() !== receiverId.toString());
        await sender.save();

        res.status(200).json({ message: 'Friend request declined.' });
    } catch(err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while declining friend request.' });
    }
};


module.exports = { allFriends, findUser, getAllRequests, sendRequest, acceptRequest, declineRequest };