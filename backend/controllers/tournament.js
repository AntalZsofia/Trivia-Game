const express = require('express');
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');
const User = require('../models/User');
const Tournament = require('../models/Tournament');
const Question = require('../models/Question');


//create tournament
const createTournament = async (req, res) => {
    const { name, category, difficulty, totalQuestions, questions, users } = req.body;
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
        const userScore = users.find(u => u.user.toString() === userId).score;
        const tournament = await Tournament.create({
            name,
            category,
            difficulty,
            totalQuestions,
            questions,
            users: [{
                user: user._id,
                score: userScore
            }]
        });

        await tournament.save();
        console.log(tournament);
        res.status(201).json(tournament);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while creating tournament.' });
    }

}

//update tournament name
const updateTournamentName = async (req, res) => {
    const { name, tournamentId } = req.body;
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({ error: 'Invalid token.' });
    }
    const token = authHeader.split(' ')[1];

    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        

        const tournament = await Tournament.findById(tournamentId);
        if(!tournament){
            return res.status(404).json({ error: 'Tournament not found.' });
        }
        if(tournament.users[0].user.toString() !== userId){
            return res.status(401).json({ error: 'You are not authorized to update this tournament.' });
        }

        tournament.name = name;
        await tournament.save();
        res.status(201).json(tournament);
    }
    catch(err){
        console.error(err);
        res.status(500).json({ error: 'An error occurred while updating tournament name.' });
    }
};

//Invite friend to tournament
const inviteFriend = async (req, res) => {
    const { tournamentId, friendId } = req.body;
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
        const tournament = await Tournament.findById(tournamentId);
        if (!tournament) {
            return res.status(404).json({ error: 'Tournament not found.' });
        }
        const friend = await User.findById(friendId);
        if (!friend) {
            return res.status(404).json({ error: 'Friend not found.' });
        }
        tournament.users.push(friendId);
        await tournament.save();
        res.status(201).json(tournament);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'An error occurred while inviting friend.' });
    }

}

module.exports = { createTournament, updateTournamentName, inviteFriend };