const express = require('express');
const apiRouter = express.Router();

const bodyParser = require('body-parser');

// Middleware
apiRouter.use(bodyParser.json());

// Route Login
apiRouter.get('/signup', (req, res) => {
  res.json({ message: 'OKKK!!!!!' });
});

module.exports = apiRouter;
