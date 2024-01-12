const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

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