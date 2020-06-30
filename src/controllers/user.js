const db = require('../../models');

exports.postUser = async (req, res) => {
  const data = require('../../seeds/Users')()[0];
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
  const Users = db.Users;

  if (data.firstName === null || data.firstName === undefined) {
    res.status(400).json({ message: "Le champs firstName n'est pas renseigné" });
  }
  if (!EMAIL_REGEX.test(data.email)) {
    return res.status(400).json({ error: "l'email n'est pas valide" });
  }
  if (!PASSWORD_REGEX.test(data.password)) {
    return res.status(400).json({
      erreur:
        'mot de pass invalide (doit avoir une longueur de 4 à 8 et inclure au moins 1 chiffre)',
    });
  } else {
    const newUser = await Users.create(data);
    res.json(data);
  }
};
