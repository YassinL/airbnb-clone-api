const express = require('express');
const router = express.Router();
const apiRouter = require('./apiRouter');

const bodyParser = require('body-parser');

// Middleware
router.use(bodyParser.json());

//Page accueil
router.get('/', (request, response) => {
  response.json({ message: 'Hello World !' });
});

// Routes api
router.use('/api', apiRouter);

// View page 404, lorsqu'on ne trouve pas l'une des routes
router.use('*', (request, response) => {
  response.status(404).json({
    error: 'Oups, error !',
  });
});
module.exports = router;
