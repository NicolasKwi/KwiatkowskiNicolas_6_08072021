import React from "react";

const PiedCard = ({ post }) => {
  return (
    <div style={{ display: "flex", margin: "10px" }}>
      <p style={post.like.likestate === 1 ? { color: "blue" } : {}}>
        like {post.article.like}{" "}
      </p>{" "}
      <p style={post.like.likestate === -1 ? { color: "red" } : {}}>
        {" "}
        dislike {post.article.dislike}{" "}
      </p>
      <p> Nbre commentaires {post.article.nbrmessages}</p>
    </div>
  );
};

export default PiedCard;
