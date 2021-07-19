import React, { useState, useEffect } from "react";
import axios from "axios";
import { getProfilUser, delProfilUser, isEmpty } from "../components/utils";
import Article from "./Article";

const Articles = () => {
  const [aucunArticle, setAucunArticle] = useState(true);
  const [messAucun, setMessAucun] = useState("");
  const [listArticles, setListArticles] = useState([]);
  const profilUser = getProfilUser();

  useEffect(() => {
    console.log(isEmpty(profilUser));
    if (isEmpty(profilUser)) {
      delProfilUser();
      window.location = "/";
    } else {
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
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, []);

  return (
    <div className="articles">
      {aucunArticle ? (
        <p>{messAucun}</p>
      ) : (
        <ul>
          {listArticles.map((post) => (
            <Article post={post} key={`article_${post.article.id}`} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Articles;
