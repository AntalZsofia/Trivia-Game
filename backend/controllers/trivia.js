const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

//random trivia
const surprise = async (req, res) => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while fetching quiz data.' });
    }
    };


//chosen category, difficulty and amount
const quiz = async (req, res) => {
  try{
    const { amount = 10, category = 9, difficulty = 'easy', type = 'multiple' } = req.query;
    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`);
  const data = await response.json();
  res.json(data);
  }catch(err){
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred while fetching quiz data.' });
  }
};

module.exports = { surprise, quiz };