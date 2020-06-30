const express = require('express');
const apiRouter = express.Router();
const bodyParser = require('body-parser');

// Middleware
apiRouter.use(bodyParser.json());

// Route Login
apiRouter.get('/signup', (req, res) => {
  res.json({ message: 'OKKK!!!!!' });
});

apiRouter.post('/signup', async (req, res) => {
  const data = require('../seeds/Users')()[0];
  const db = require('../models');
  const Users = db.Users;
  if (data.firstName === null || data.firstName === undefined) {
    res.status(400);
    res.json({ message: "Le champs firstName n'est pas renseigné" });
  } else {
    const newUser = await Users.create(data);
    res.json(data);
  }
});

module.exports = apiRouter;
