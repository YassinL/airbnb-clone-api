const model = require('../../models');
const jwtToken = require('../../utils/jwt');
const Users = model.Users;

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,8}$/;
const FIRSTNAME_REGEX = /^[a-zA-Z]{1,}$/;

exports.signUp = async (req, res) => {
  const { firstName, lastName, email, password, city, description, birthday, role } = req.body;

  if (firstName === null || firstName === undefined) {
    res.status(400).json({ message: "Le champs firstName n'est pas renseigné" });
  }
  if (!FIRSTNAME_REGEX.test(firstName)) {
    return res
      .status(400)
      .json({ erreur: 'le champs firstName doit être une chaîne de caractère' });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ erreur: "l'email n'est pas valide" });
  }
  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({
      erreur:
        'mot de pass invalide (doit avoir une longueur de 4 à 8 et inclure au moins 1 chiffre)',
    });
  } else {
    const userFound = await Users.findOne({ attributes: ['email'], where: { email: email } });
    if (userFound === null) {
      const newUser = await Users.create({
        firstName,
        lastName,
        email,
        password,
        city,
        description,
        birthday,
        role,
      });
      res.status(201).json(newUser);
    } else {
      res.status(409).json({
        message: 'Un utilisateur utilisant cette adresse email est déjà enregistré',
      });
    }
  }
};

exports.signIn = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;

  if (email === null || password === null) {
    res.status(400).json({ message: 'Les champs ne sont pas renseignés' });
  } else {
    const userFound = await Users.findOne({ where: { email: email } });
    if (userFound) {
      res.status(200).json({
        userId: userFound.id,
        token: jwtToken.generateTokens,
      });
    } else {
      res.status(401).json({
        message: "Votre mot de passe n'est pas correct",
      });
    }
  }
};
