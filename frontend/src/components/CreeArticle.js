import React, { useState } from "react";

const CreeArticle = () => {
  const [postContent, setPostContent] = useState();
  const [postImg, setPostImg] = useState();
  const [postLien, setPostLien] = useState();

  const [file, setFile] = useState();

  const handlePicture = (e) => {
    setPostImg(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  return (
    <div className="creearticle">
      <textarea
        rows="5"
        placeholder="Ecrivez un commentaire ..."
        onChange={(e) => setPostContent(e.target.value)}
      ></textarea>
      <div className="cree_postimage">
        {postImg && <img src={postImg} alt="Image choisi" />}
        <div className="postimage_bouttons">
          <label classname="label_inputfile" htmlFor="imagecree">Choissez une image :</label>
          <input
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
          value={postLien}
        />
      </div>
      <div className="cree_post_confirme">
            <button onClick={() => {}}>Enregistrer</button>
            <button onClick={() => {}}>Annuler</button>
          </div>
    </div>
  );
};

export default CreeArticle;
