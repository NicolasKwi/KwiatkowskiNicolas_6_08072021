import React from "react";
import { dateParser } from "./utils";

const Article = ({ post }) => {
  return (
    <li className="article">
      <div>
        {post.profil.avatar ? (
          <img src="post.profil.avatar" alt="photo" />
        ) : (
          <img src="./img/random-user.png" alt="photo" />
        )}
        <h3>article de {post.profil.pseudonyme}</h3>
        <h2>créé le {dateParser(post.article.createdAt)}</h2>
        {post.article.updatedAt != post.article.createdAt && (
          <h2>modifié le {dateParser(post.article.updatedAt)}</h2>
        )}
      </div>
      <div>
        <p>{post.article.content}</p>
        {post.article.img && <img src="" alt="" />}
        {post.article.lien && (
          <a href={post.article.lien}>{post.article.lien}</a>
        )}
      </div>
      <div style={{ display: "flex", margin: "10px" }}>      
        <p style={post.like.likestate == 1 ? { color: "blue" } : {}}>
          like {post.article.like}{" "}
        </p>{" "}
        <p style={post.like.likestate == -1 ? { color: "red" } : {}}> dislike {post.article.dislike} </p>
        <p> Nbre commentaires {post.article.nbrmessages}</p>
      </div>
    </li>
  );
};

export default Article;
