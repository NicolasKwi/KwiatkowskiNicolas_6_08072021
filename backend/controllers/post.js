//models sequelize
const { models } = require("../sequelize/sequelize");
const sequelize = require("../sequelize/sequelize");
//gestion des fichier
const fs = require("fs");
//post
// cree une sauce

// getProfilById = async (profilId) => {
//   models.profil.findOne({ where: { id: profilId } }).then((profil) => {
//     return profil.dataValues;
//   });
// };

exports.createPost = (req, res, next) => {
  let imageUrl = "";
  if (req.file)
    imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;

  models.article
    .create({
      profilId: req.body.profilId,
      content: req.body.content,
      img: imageUrl,
      lien: req.body.lien,
    })
    .then(() => res.status(201).json({ message: "Article enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

//met a jour le status j'aime de l'utilisateur sur une sauce
exports.updateLikePost = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      //permet de stocker les index correspondant au uesrid dans les tableaux des like/dislike
      let indexUserLike = sauce.usersLiked.indexOf(req.body.userId);
      let indexUserDislike = sauce.usersDisliked.indexOf(req.body.userId);
      let messageRes = "";

      switch (req.body.like) {
        case 0: //annule les j'aime/j'aime pas
          //si dans tableau alors supprime
          if (indexUserLike > -1) {
            sauce.usersLiked.splice(indexUserLike, 1);
            sauce.likes -= 1;
            messageRes = "J'aime enlevé";
          }
          if (indexUserDislike > -1) {
            sauce.usersDisliked.splice(indexUserDislike, 1);
            sauce.dislikes -= 1;
            messageRes = "Je n'aime pas enlevé";
          }
          break;
        case 1: //j'aime
          //enleve si dans dislike
          if (indexUserDislike > -1) {
            sauce.usersDisliked.splice(indexUserDislike, 1);
            sauce.dislikes -= 1;
          }
          //ajoute si userid dans usersLiked n'existe pas
          if ((indexUserLike = -1)) {
            sauce.usersLiked.push(req.body.userId);
            sauce.likes += 1;
            messageRes = "J'aime enregistré";
          }
          break;
        case -1: //j'aime pas
          //enleve si dans like
          if (indexUserLike > -1) {
            sauce.indexUserLike.splice(indexUserLike, 1);
            sauce.likes -= 1;
          }
          //ajoute si userid dans usersDisliked n'existe pas
          if ((indexUserLike = -1)) {
            sauce.usersDisliked.push(req.body.userId);
            sauce.dislikes += 1;
            messageRes = "Je n'aime pas enregistré";
          }
          break;
        default:
          throw "Valeur de like/dislike erroné ";
      }
      sauce.save();
      res.status(200).json(messageRes);
    })
    .catch((error) => res.status(400).json({ error }));
};

//put
// met à jour une sauce
exports.ModifyPost = async (req, res, next) => {
  let imageUrl = "";

  // supprime l'ancienne image
  await models.article
    .findOne({ where: { id: req.params.id } })
    .then((post) => {
      if (req.file) {
        if (post.img && post.img != "") {
          const filename = post.img.split("/images/")[1];
          fs.unlinkSync(`images/${filename}`); //suppression synchrone
        }
        imageUrl = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      } else {
        if (req.body.img != "") imageUrl = post.img;
      }
      return post;
    });

  models.article
    .update(
      {
        content: req.body.content,
        lien: req.body.lien,
        img: imageUrl,
      },
      {
        where: { id: req.params.id },
      }
    )
    .then(() => res.status(200).json({ message: "Article modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

//delete
//supprime une sauce
exports.deletePost = async (req, res, next) => {
  // supprime l'image si elle existe
  await models.article
    .findOne({ where: { id: req.params.id } })
    .then((article) => {
      if (article && article.img != "") {
        const filename = article.img.split("/images/")[1];
        fs.unlinkSync(`images/${filename}`);
      }
    });

  models.article
    .destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "Article supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

//get
//renvoie toutes les sauces
exports.getAllPost = (req, res, next) => {
  //tableau des articles +profil

  models.article
    .findAll()
    .then(async (articles) => {
      if (articles) {
        let listArticles = [];
        let userLike = {};
        for (const articleTemp of articles) {
          userLike = { likestate: 0 };
          let profilArticle = await models.profil
            .findOne({
              attributes: ["id", "pseudonyme", "avatar", "fonction"],
              where: { id: articleTemp.profilId },
            })
            .then(async (profil) => {
              let userLikeTest = await models.like
                .findOne({
                  attributes: ["id", "likestate", "profilId", "articleId"],
                  where: { articleId: articleTemp.id, profilId: profil.id },
                })
                .then((like) => {
                  return like;
                });
              userLikeTest
                ? (userLike = userLikeTest)
                : (userLike = { likestate: 0 });

              return profil;
            });
          listArticles.push({
            article: articleTemp,
            profil: profilArticle,
            like: userLike,
          });
        }
        if (listArticles.length > 0) {
          res.status(200).json({ articles: listArticles });
        } else {
          res.status(200).json({ message: "Aucun article trouvé" });
        }
      } else {
        res.status(200).json({ message: "Aucun article trouvé" });
      }
    })
    .catch((error) => {
    
      res.status(400).json({ error });
    });
};
//renvoie l'article avec l'id
exports.getOnePost = (req, res, next) => {
  models.article
    .findOne({
      where: { id: articleTemp.profilId },
    })
    .then((article) => {
      models.profil.findOne(
        {
          attributes: ["id", "pseudonyme", "avatar", "fonction"],
          where: { id: article.profilId },
        }
          .then((profil) => {
            models.like
              .findOne({
                attributes: ["id", "likestate", "profilId", "articleId"],
                where: { articleId: articleTemp.id, profilId: profil.id },
              })
              .then((like) => {
                res
                  .status(200)
                  .json({ article: article, profil: profil, like: like });
              });
          })
          .catch((error) => res.status(404).json({ error }))
      );
    })
    .catch((error) => res.status(404).json({ error }));
};
//renvoie la liste des messages pour un article
exports.getAllMessagesForOnePost = (req, res, next) => {
  models.message
    .findAll({
      where: { articleId: req.params.id },
    })
    .then(async (messages) => {
      let listMessages = [];
      if (messages) {
        for (const messagesTemp of messages) {
          let profilRecup = await models.profil
            .findOne({
              attributes: ["id", "pseudonyme", "avatar", "fonction"],
              where: { id: messagesTemp.profilId },
            })
            .then((profil) => {
              return profil;
            });
          if (profilRecup) {
            listMessages.push({ message: messagesTemp, profil: profilRecup });
          }
        }
      }

      if (listMessages.length > 0) {
        res.status(200).json({ messages: listMessages });
      } else {
        res.status(200).json({ message: "Aucun message trouvé" });
      }
    })
    .catch((error) => {     
      res.status(400).json({ error });
    });
};
exports.createMessageForOnePost = (req, res, next) => {
  models.message
    .create({
      profilId: req.body.profilId,
      articleId: req.body.articleId,
      content: req.body.content,
    })
    .then((messcree) => {
      if (messcree) {
        models.article.update(
          { nbrmessages: sequelize.literal("nbrmessages + 1") },
          { where: { id: messcree.articleId } }
        );
      }
      res.status(201).json({ message: "Message enregistré !" });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteMessageForOnePost = (req, res, next) => {
  models.message
    .destroy({ where: { id: req.params.id } })
    .then((messdetruit) => {
      if (messdetruit === 1) {
        models.article.update(
          { nbrmessages: sequelize.literal("nbrmessages - 1") },
          { where: { id: req.body.articleId } }
        );
      }
      res.status(200).json({ message: "Message supprimé !" });
    })
    .catch((error) => res.status(400).json({ error }));
};
