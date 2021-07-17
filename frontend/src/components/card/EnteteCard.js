import React from "react";
import { dateParser } from "../utils";

const EnteteCard = ({ post }) => {
  return (
    <div className="entetecard">
      {post.profil.avatar ? (
        <img src="post.profil.avatar" alt="photo avatar" />
      ) : (
        <img src="./img/random-user.png" alt="photo avatar" />
      )}
      <div className="identite">
        <p className="identite_psedo">{post.profil.pseudonyme}</p>
        <p className="identite_fonction">{post.profil.fonction}</p>
      </div>
      <div className="entete_espace"> </div>
      <div className="horaire_post">
        <p className="datepost">
          Posté le {dateParser(post.article.createdAt)}
        </p>
        {post.article.updatedAt != post.article.createdAt && (
          <p className="modifipost">
            modifié le {dateParser(post.article.updatedAt)}
          </p>
        )}
      </div>
    </div>
  );
};

export default EnteteCard;
