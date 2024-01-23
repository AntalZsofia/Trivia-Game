const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const triviaRoutes = require('./routes/trivia');

const cors = require('cors');
const app = express();
const port = 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());


//Parse JSON request body
app.use(express.json());

//Define authentication routes
app.use('/auth', authRoutes);

// Define user routes
app.use('/user', userRoutes);

//Define trivia routes
app.use('/trivia', triviaRoutes);

//Define friends routes
app.use('/friends', friendsRoutes);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});