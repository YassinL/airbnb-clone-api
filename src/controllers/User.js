const bcrypt = require('bcrypt');

const model = require('../../models');
const jwtToken = require('../../utils/jwt');
const Users = model.Users;

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
const FIRSTNAME_REGEX = /^[a-zA-Z]{1,}$/;

function isRensegned(champ, wohMessage, message = null) {
  if (champ === null || champ === undefined || champ == '') {
    wohMessage.push(message);
    return false;
  }
  return true;
}

function isValide(regex, champ, wohMessage, message) {
  if (!regex.test(champ)) {
    wohMessage.push(message);
    return false;
  }
  return true;
}

module.exports = {
  signUp: async (req, res) => {
    var statusHttp;
    var message = [];
    const { firstName, lastName, email, password, city, description, birthday, role } = req.body;
    if (isRensegned(firstName, message, '') && isRensegned(lastName, message, '') && isRensegned(email, message, '') && isRensegned(password, message, '') && isRensegned(city, message, '') && isRensegned(description, message, '') && isRensegned(birthday, message, '') && isRensegned(role, message, '') && isValide(FIRSTNAME_REGEX, firstName, message, '') && isValide(EMAIL_REGEX, email, message, '') && isValide(PASSWORD_REGEX, password, message, '')) {
      const userFound = await Users.findOne({ attributes: ['email'], where: { email: email } });
      if (userFound === null) {
        statusHttp = 201;
        message = 'utilisateur cree!';
        bcrypt.hash(password, 5, async (err, bcryptPassword) => {
          const newUser = await Users.create({ firstName, lastName, email, password: bcryptPassword, city, description, birthday, role });
        });
      } else {
        statusHttp = 409;
        message.push('Un utilisateur utilisant cette adresse email est déjà enregistré');
      }
    } else {
      isRensegned(firstName, message, "Le champs firstName n'est pas renseigné");
      isRensegned(lastName, message, "Le champs lastName n'est pas renseigné");
      isRensegned(email, message, "Le champs email n'est pas renseigné");
      isRensegned(password, message, "Le champs password n'est pas renseigné");
      isRensegned(city, message, "Le champs city n'est pas renseigné");
      isRensegned(description, message, "Le champs description n'est pas renseigné");
      isRensegned(birthday, message, "Le champs birthday n'est pas renseigné");
      isRensegned(role, message, "Le champs role n'est pas renseigné");
      isValide(FIRSTNAME_REGEX, firstName, message, 'le champs firstName doit être une chaîne de caractère');
      isValide(EMAIL_REGEX, email, message, "l'email n'est pas valide");
      isValide(PASSWORD_REGEX, password, message, 'mot de pass invalide (doit avoir une longueur de 4 à 8 et inclure au moins 1 chiffre)');
      statusHttp = 400;
    }
    res.status(statusHttp).json({
      message,
    });
  },

  signIn: async (req, res) => {
    console.log(req.body.email);
    const { email, password } = req.body;

    if (email === null || password === null) {
      res.status(400).json({ message: 'Les champs ne sont pas renseignés' });
    } else {
      const userFound = await Users.findOne({ where: { email: email } });
      if (userFound) {
        bcrypt.compare(password, userFound.password, (err, resByScript) => {
          if (resByScript) {
            res.status(200).json({
              userId: userFound.id,
              token: jwtToken.generateTokens(userFound),
            });
          }
        });
      } else {
        res.status(401).json({
          message: "Votre mot de passe n'est pas correct",
        });
      }
    }
  },
};
