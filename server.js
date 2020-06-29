const express = require('express');
const server = express();
const morgan = require('morgan');

const router = require('./routes');

// ici on appelle les routes du dossier routes
server.use(morgan('dev'));
server.use(router);

module.exports = server;
