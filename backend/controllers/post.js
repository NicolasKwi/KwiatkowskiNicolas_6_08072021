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

//met a jour le status j'aime de l'utilisateur sur un Post
exports.updateLikePost = async (req, res, next) => {
  models.liked
    .findOne({
      where: { articleId: req.params.id, profilId: req.body.profilId },
    })
    .then(async (likeTrouver) => {
      let strLikeReturn = "";
      let idarticle = req.params.id;
      if (likeTrouver) {
        if (req.body.like == 0) {
          //detriut
          likeTrouver.destroy();
          models.article.decrement("like", {
            by: 1,
            silent: true,
            where: { id: req.params.id },
          });
        }
      } else {
        if (req.body.like == 1) {
          //cree
          models.liked.create({
            profilId: req.body.profilId,
            articleId: req.params.id,
          });
          models.article.increment("like", {
            by: 1,
            silent: true,
            where: { id: req.params.id },
          });
        }
      }
      res.status(200).json({ message: "Like modifié !" });
    })
    .catch((error) => res.status(400).json({ error }));
};

//put
// met à jour d'un post
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
//supprime un post
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
//renvoie tout les articles
exports.getAllPost = (req, res, next) => {
  //tableau des articles +profil

  models.article
    .findAll()
    .then(async (articles) => {
      if (articles) {
        let listArticles = [];
        // let userLike = {};
        for (const articleTemp of articles) {
          // userLike = { likestate: 0 };
          let profilArticle = await models.profil
            .findOne({
              attributes: ["id", "pseudonyme", "avatar", "fonction"],
              where: { id: articleTemp.profilId },
            })
            .then(async (profil) => {
              return profil;
            });
          listArticles.push({
            article: articleTemp,
            profil: profilArticle,
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
                attributes: ["id", "profilId", "articleId"],
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
          { where: { id: messcree.articleId }, silent: true }
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
          { where: { id: req.body.articleId }, silent: true }
        );
      }
      res.status(200).json({ message: "Message supprimé !" });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getLikeState = (req, res, next) => {
  models.liked
    .findOne({
      where: { articleId: req.params.articleId, profilId: req.params.id },
    })
    .then((likeTrouver) => {
      let resultlike = 0;
      if (likeTrouver) {
        resultlike = 1;
      }
      res.status(200).json({ like: resultlike });
    })
    .catch((error) => res.status(400).json({ error }));
};
