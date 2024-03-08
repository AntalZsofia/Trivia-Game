const express = require('express');
const jwt = require('jsonwebtoken');
let fetch;
import('node-fetch').then(nodeFetch => {
  fetch = nodeFetch.default;
});
const User = require('../models/User');
const Message = require('../models/Message');


//all messages
const allMessages = async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
    const token = authHeader.split(' ')[1];


    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId
            ;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const messages = await Message.find({ Recipients: userId });
        res.status(200).json(messages);
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while fetching messages.' });
    }
}

//send message
const sendMessage = async (req, res) => {
    const authHeader = req.headers.authorization;
    let { recipients, message, type, data } = req.body;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
    const token = authHeader.split(' ')[1];


    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId
            ;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        if (!Array.isArray(recipients)) {
            recipients = [recipients];
        }

        for (let recipient of recipients) {
            const recipientUser = await User.findOne({ username: recipient });
            if (!recipientUser) {
                return res.status(404).json({ error: `Recipient ${recipient} not found.` });
            }

            const newMessage = new Message({
                Sender: userId,
                Message: message,
                Recipients: [recipientUser._id],
                Type: type,
                Data: data
            });
            await newMessage.save();
        }
        res.status(200).json({ message: 'Message sent.' });
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while sending message.' });
    }
}

//delete message
const deleteMessage = async (req, res) => {
    const authHeader = req.headers.authorization;
    const { messageId } = req.params;
    

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token.' });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ error: 'Message not found.' });
        }
        // Check if the user is either the sender or the receiver of the message
        if (message.Sender !== userId && !message.Recipients.includes(userId)) {
            return res.status(403).json({ error: 'You do not have permission to delete this message.' });
        }
        await Message.deleteOne({ _id: messageId });
        res.status(200).json({ message: 'Message deleted.' });
    }
    catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while deleting message.' });
    }
}

module.exports = { allMessages, sendMessage, deleteMessage };