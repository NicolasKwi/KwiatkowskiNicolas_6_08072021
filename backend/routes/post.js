const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require('../middleware/multer-config');
//controlleur
const postCtrl = require("../controllers/post");

// cree un post
router.post("/", auth,multer, postCtrl.creeSauce);
//met a jour le status j'aime de l'utilisateur sur un post
router.post("/:id/like", auth, postCtrl.updateLikeSauce);

//put
// met à jour une sauce
router.put("/:id", auth,multer, postCtrl.ModifySauce);

//delete
//supprime une sauce
router.delete("/:id", auth, postCtrl.deleteSauce);

//get
//renvoie toutes les sauces
router.get("/", auth, postCtrl.getAllSauce);
//renvoie la sauces avec l'id
router.get("/:id", auth, postCtrl.getOneSauce);

module.exports = router;
