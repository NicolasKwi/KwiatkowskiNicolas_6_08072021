import React, { useState, useEffect } from "react";
import { setProfilUser, getProfilUser } from "../components/utils";
import axios from "axios";

const CreeArticle = () => {
  const profilUser = getProfilUser();

  const [postContent, setPostContent] = useState("");
  const [postImg, setPostImg] = useState("");
  const [postLien, setPostLien] = useState("");
  const [file, setFile] = useState();

  const [erreurTrouver, setErreurTrouver] = useState();
// selection de l'image
  const handlePicture = (e) => {
    setPostImg(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  //post la creation d'un article
  const handlePost = () => {
    if (
      postContent.trim() !== "" ||
      postImg.trim() !== "" ||
      postLien.trim() !== ""
    ) {
      const data = new FormData();
      data.append("profilId", profilUser.id);
      data.append("content", postContent);
      data.append("lien", postLien);
      data.append("img", postImg);
      if (file) data.append("image", file);
      
      //api update article
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/post/`,
        data: data,
        headers: {
          Authorization: `bearer ${profilUser.token}`,
        },
      })
        .then(() => {
          setPostContent("");
          setPostImg("");
          setPostLien("");
          window.location = "/acceuil";
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      setErreurTrouver("Veuillez rentrer un message, une image ou un lien");
      //affichage pour dire qu'il font un contenu
    }
  };

  useEffect(() => {
    // test si on a le profil et le token
    if (!profilUser || !profilUser.id || !profilUser.token) {
      setProfilUser("");
      //retour a la page connection
      window.location = "/";
    }
  }, []);

  return (
    <div className="creearticle">
      <textarea
        rows="5"
        placeholder="Ecrivez un commentaire ..."
        onChange={(e) => setPostContent(e.target.value)}
      ></textarea>
      <div className="cree_postimage">
        {postImg && (
          <img src={postImg} alt="affichage de la photo de la selection" />
        )}
        <div className="postimage_bouttons">
          <label className="label_inputfile" htmlFor="imagecree">
            Choissez une image :
          </label>
          <input
            className="imagecree_file"
            type="file"
            id="imagecree"
            name="imagecree"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => {
              handlePicture(e);
            }}
          />
          {postImg && (
            <button
              onClick={() => {
                setPostImg("");
                document.getElementById("imagecree").value = "";
              }}
            >
              supprimer image
            </button>
          )}
        </div>
      </div>
      <div className="cree_lien_post">
        <label htmlFor="creatpostlink">Lien :</label>
        <input
          type="text"
          id="creatpostlink"
          onChange={(e) => {
            setPostLien(e.target.value);
          }}
        />
      </div>
      <div className="cree_post_confirme">
        <p>{erreurTrouver}</p>
        <button onClick={() => handlePost()}>Enregistrer</button>
        <button onClick={() => {}}>Annuler</button>
      </div>
    </div>
  );
};

export default CreeArticle;
