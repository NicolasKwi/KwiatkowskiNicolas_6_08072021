import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import Article from "./Article";

const Data = require("../service/data");

const Articles = () => {
  const [aucunArticle, setAucunArticle] = useState(true);
  const [messAucun, setMessAucun] = useState("");
  const [listArticles, setListArticles] = useState([]);
  const profilUser = JSON.parse(localStorage.getItem("profil"));

  useEffect(() => {
    // test si on a le profil et le token
    if (!profilUser || !profilUser.id || !profilUser.token) {
      localStorage.setItem("profil", "");
      //retour a la page connection
      window.location = "/";
    }

    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/post`,
      headers: {
        Authorization: `bearer ${profilUser.token}`,
      },
    })
      .then((res) => {
        if (res.data.message) {
          //si il y a un message c'est qu'il n'y a pas d'article
          setAucunArticle(true);
          setMessAucun(res.data.message);
        } else {
          //il y as des articles
          setAucunArticle(false);
          setListArticles(res.data.articles);
          console.log(res.data.articles);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="articles">
      <h1>{window.location.origin}</h1>
      {aucunArticle ? (
        <p>{messAucun}</p>
      ) : (
        <ul>
         { listArticles.map((post) => <Article post={post} key={`article_${post.article.id}`}/>)}
        </ul>
      )}
    </div>
  );
};

export default Articles;
