//models sequelize
const { models } = require("../sequelize/sequelize");
const jwt = require("jsonwebtoken"); // securise les echanges de token
const bcrypt = require("bcrypt");
require("dotenv").config();

// post
//cree user + profil (chiffre mot de passe)
exports.signupUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      models.user //creation de l'utilisteur
        .create({
          email: req.body.email,
          password: hash,
        })
        .then((userCree) => {
          // si reussi,cree le profil
          models.profil
            .create({
              pseudonyme: userCree.dataValues.email,
              userId: userCree.dataValues.id,
            })
            .then(res.status(201).json({ message: "Utilisateur créé !" }))
            .catch(() =>
              res
                .status(500)
                .json({ error: "Erreur lors de la création du profil" })
            );
        })
        .catch((error) => {
          let message = "Erreur lors de la création de l'utilisateur";
          if (error.errors[0].type == "unique violation") {
            message = "L'email est déja utilisé";
          }
          res.status(500).json({ error: message });
        });
      //
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};
//connection utilisateur
exports.loginUser = (req, res, next) => {
  // console.log(req.body);
  models.user
    .findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          models.profil
            .findOne({ where: { userId: user.id } })
            .then((profil) => {
              if (!profil) {
                return res.status(401).json({ error: "profil non trouvé !" });
              }
              // renvoie le profil
              res
                .status(200)
                .json({
                  profil,
                  token: jwt.sign({ userId: profil.id }, process.env.TOKEN, {
                    expiresIn: "24h",
                  }),
                })
                .catch((error) => res.status(500).json({ error }));
            });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
