import React from "react";
import { dateParser } from "../utils";

const EnteteCard = ({ post }) => {
  return (
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
  );
};

export default EnteteCard;
