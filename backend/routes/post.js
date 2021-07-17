const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');
//controlleur
const postCtrl = require("../controllers/post");

// cree un post
router.post("/", auth,multer, postCtrl.createPost);
//met a jour le status j'aime de l'utilisateur sur un post
router.post("/:id/like", auth, postCtrl.updateLikePost);

//cree un message pour un post
router.post("/message", auth, postCtrl.createMessageForOnePost);

//put
// met à jour le post
router.put("/:id", auth,multer, postCtrl.ModifyPost);

//delete
//supprime une sauce
router.delete("/:id", auth, postCtrl.deletePost);
//supprime un message
router.delete("/message/:id", auth, postCtrl.deleteMessageForOnePost);

//get
//renvoie touts les posts
router.get("/", auth, postCtrl.getAllPost);
//renvoie le post avec l'id
router.get("/:id", auth, postCtrl.getOnePost);

//renvoie les messages pour un post (id => id du post)
router.get("/messages/:id", auth, postCtrl.getAllMessagesForOnePost);


module.exports = router;
