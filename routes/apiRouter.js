const express = require('express');
const apiRouter = express.Router();
const bodyParser = require('body-parser');

const userController = require('../src/controllers/user');
// Middleware
apiRouter.use(bodyParser.json());

// Route Login
apiRouter.get('/signup', (req, res) => {
  res.json({ message: 'OKKK!!!!!' });
});

apiRouter.post('/signup', userController.postUser);

module.exports = apiRouter;
