const express = require('express');
const signInRouter = express.Router();
const bodyParser = require('body-parser');

const userController = require('../src/controllers/User');

// Middleware
signInRouter.use(bodyParser.json());

// Route Login
signInRouter.get('/signin', (req, res) => {
  res.json({ message: 'page Signin OK!!' });
});

signInRouter.post('/signin', userController.signIn);

module.exports = signInRouter;
