const express = require('express');
const router = express.Router();
const apiRouter = require('./apiRouter');

router.get('/', (request, response) => {
  response.send('Hello World !');
});

router.use('/api', apiRouter);

// View page 404, lorsqu'on ne trouve pas l'une des routes
router.get('*', (request, response) => {
  response.status(404).render('404');
});

module.exports = router;
