const express = require('express');
const app = express();

const router = require('./routes');

// ici on appelle les routes du dossier routes
app.use(router);

app.listen('4000', (err) => {
  if (err) console.error(err);
  else console.log('Serveur Démarré');
});
