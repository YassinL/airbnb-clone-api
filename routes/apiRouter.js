const express = require('express');
const apiRouter = express.Router();

apiRouter.get('/j1', (req, res) => {
  res.send('OKKK!!!!!');
});

module.exports = apiRouter;
