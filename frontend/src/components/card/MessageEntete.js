import React from "react";

const MessageEntete = ({ message }) => {
  return (
    <div className="messageentete">
      {post.profil.avatar ? (
        <img src={post.profil.avatar} alt="Avatar" />
      ) : (
        <img src="./img/random-user.png" alt="Avatar par defaut" />
      )}
      <div className="identite">
        <p className="identite_psedo">{post.profil.pseudonyme}</p>
        <p className="identite_fonction">{post.profil.fonction}</p>
      </div>
      <div className="entete_espace"> </div>
      <div className="horaire_message">
        <p className="datemessage">
          Posté le {dateParser(post.article.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default MessageEntete;
