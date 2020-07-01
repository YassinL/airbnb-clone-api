const express = require('express');
const signUpRouter = express.Router();
const bodyParser = require('body-parser');

const userController = require('../src/controllers/User');
// Middleware
signUpRouter.use(bodyParser.json());

// Route Login
signUpRouter.get('/signup', (req, res) => {
  res.json({ message: 'OKKK!!!!!' });
});

signUpRouter.post('/signup', userController.signUp);

module.exports = signUpRouter;
