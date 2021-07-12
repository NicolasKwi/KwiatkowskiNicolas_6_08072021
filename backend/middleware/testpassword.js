// test le shema de password
const passwordSchema = require("../models/securepassword");

// vérifie que le mot de passe valide le schema décrit
module.exports = (req, res, next) => {
  try {
    if (!passwordSchema.validate(req.body.password)) {
      console.log(req.body.password);
      // res.statusMessage =
      res
        .status(401)
        .json({
          error:
            ".Le mot de passe n'est pas assez sécurisé : minimum de 8 caractères sans espaces et au moins 1 majuscule,1 minuscule et 2 chiffres.",
        });
      // res.status(401).end();
    } else {
      next();
    }
  } catch (error) {
    // si une erreur survient, on le log mais on ne renvoie pas l'erreur pour ne pas devoiler le plugin
    console.log(error);
    res.status(400).end();
  }
};
