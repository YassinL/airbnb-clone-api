const express = require('express');
const apiRouter = express.Router();

const bodyParser = require('body-parser');

// Middleware
apiRouter.use(bodyParser.json());

// Route Login
apiRouter.get('/login', (req, res) => {
  res.json({ message: 'OKKK!!!!!' });
});

module.exports = apiRouter;
