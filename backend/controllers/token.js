const express = require('express');
const router = express.Router();
let fetch;
import('node-fetch').then(nodeFetch => {
  fetch = nodeFetch.default;
});
const Token = require('../models/Token');

//save token

const saveToken = async (req, res) => {
    const { token, userId } = req.body;

    try{
        const newToken = new Token({ token, userId });
        await newToken.save();
        res.status(201).json({ newToken });
    }
    catch{
        res.status(409).json({ message: error.message });
    }
};

module.exports = { saveToken };