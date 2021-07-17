import React, { useState } from "react";

const PiedCard = ({ post }) => {
  const [etatLike,setEtatLike]=useState(post.like.likestate)
  const [affichageMessage,setAffichageMessage] =useState(false);

  return (
    <div className="piedcard">
      <div className="piedcard_info">
        <div>
          {etatLike === 0 ? (
            <img src="./img/icons/heart.svg" title="Like" alt="liker" />
          ) : (
            <img
              src="./img/icons/heart-filled.svg"
              title="Like"
              alt="Non liker"
            />
          )}
          <p>{post.article.like} like</p>
        </div>
        <div className="commentaire">
          <img src="./img/icons/message2.svg" title="Commentaires" alt="Commentaires" />
          <p>{post.article.nbrmessages} </p>
        </div>
      </div>
    </div>
  );
};

export default PiedCard;
