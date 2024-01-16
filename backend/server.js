const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = 3000;


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

//Models
const User = require('./models/User');
const Tournament = require('./models/Tournament');
const Question = require('./models/Question');




// Middleware
app.use(cors());



// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//random trivia
app.get('/surprise', async (req, res) => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'An error occurred while fetching quiz data.' });
    }
    });


//chosen category and difficulty
app.get('/quiz', async (req, res) => {
  try{
    const { amount = 10, category = 9, difficulty = 'easy', type = 'multiple' } = req.query;
    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`);
  const data = await response.json();
  res.json(data);
  }catch(err){
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred while fetching quiz data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});