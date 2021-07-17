import axios from "axios";
import React, {  useState } from "react";
import EnteteCard from "./card/EnteteCard";
import PiedCard from "./card/PiedCard";
import {getProfilUser } from "./utils";

const Article = ({ post }) => {
  const profilUser = getProfilUser();

  // const [allowModifi, setAllowModifi] = useState(false);
  // let allowModifi = false;
  const [postContent] = useState(post.article.content);
  const [postimg] = useState(post.article.img);
  const [postlien] = useState(post.article.lien);

  const [postContentmodif, setPostContentmodif] = useState(
    post.article.content
  );
  const [postimgmodif, setPostimgmodif] = useState(post.article.img);
  const [postlienmodif, setPostlienmodif] = useState(post.article.lien);
  const [file, setFile] = useState("");

  const [isEdit, setIsEdit] = useState(false);

  const handlePicture = (e) => {
    setPostimgmodif(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  const handlePostUpdate = () => {
    if (
      postContentmodif !== postContent ||
      postimg !== postimgmodif ||
      postlien !== postlienmodif
    ) {
      const data = new FormData();
      data.append("profilId", profilUser.id);
      data.append("content", postContentmodif);
      data.append("lien", postlienmodif);
      data.append("img", postimgmodif);
      if (file) data.append("image", file);
      //api update article
      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}/api/post/${post.article.id}`,
        data: data,
        headers: {
          Authorization: `bearer ${profilUser.token}`,
        },
      })
        .then(() => {
          setIsEdit(false);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const handlePostDelete = () => {
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}/api/post/${post.article.id}`,
      data: { profilId: profilUser.id },
      headers: {
        Authorization: `bearer ${profilUser.token}`,
      },
    })
      .then(() => {
        window.location = "/acceuil";
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <li className="article">
      <div>
        <EnteteCard post={post} />
        {post.article.profilId === profilUser.id && (
          <div>
            <span onClick={() => setIsEdit(true)}>modifier</span>
            <span onClick={() => handlePostDelete()}>Supprimer</span>
          </div>
        )}
      </div>
      {isEdit ? (
        <div className='edition_article'>
          <textarea
            defaultValue={postContentmodif}
            onChange={(e) => setPostContentmodif(e.target.value)}
          ></textarea>
          <div>
            {postimgmodif && <img src={postimgmodif} alt="" />}
            <input
              type="file"
              id="image"
              name="image"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => handlePicture(e)}
            />
            {postimgmodif && (
              <button
                onClick={() => {
                  setPostimgmodif("");
                  setFile("");
                  document.getElementById("image").value = "";
                }}
              >
                supprimer image
              </button>
            )}
          </div>
          <div>
            <label htmlFor={`lienmodif_${post.article.id}`}>Lien :</label>
            <input
              type="text"
              id={`lienmodif_${post.article.id}`}
              onChange={(e) => {
                setPostlienmodif(e.target.value);
              }}
              value={postlienmodif}
            />
          </div>
          <div>
            <button onClick={() => handlePostUpdate()}>Enregistrer</button>
            <button onClick={() => setIsEdit(false)}>Annuler</button>
          </div>
        </div>
      ) : (
        <div className="affichage_article">
          <p>{postContent}</p>
          {postimg && <img src={postimg} alt="" />}
          {postlien && <a href={postlien}>{postlien}</a>}
        </div>
      )}
      <PiedCard post={post} />
    </li>
  );
};

export default Article;
