const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
//controlleur
const postCtrl = require("../controllers/post");

// cree un post
router.post("/", auth, multer, postCtrl.createPost);
//cree un message pour un post
router.post("/message", auth, postCtrl.createMessageForOnePost);

//put
// met à jour le post
router.put("/:id", auth, multer, postCtrl.ModifyPost);
//met a jour le status j'aime de l'utilisateur sur un post
router.put("/:id/like", auth, postCtrl.updateLikePost);
//met à jour le profil
router.put("/profil/:id", auth, multer, postCtrl.updateProfil);

//delete
//supprime un post
router.delete("/:id", auth, postCtrl.deletePost);
//supprime un message
router.delete("/message/:id", auth, postCtrl.deleteMessageForOnePost);

//get
//renvoie touts les posts
router.get("/", auth, postCtrl.getAllPost);

//renvoie l'etat like
router.get("/:articleId/like/:id", auth, postCtrl.getLikeState);

//renvoie les messages pour un post (id => id du post)
router.get("/messages/:id", auth, postCtrl.getAllMessagesForOnePost);

module.exports = router;
