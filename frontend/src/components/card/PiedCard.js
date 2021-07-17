import React, { useState, useEffect } from "react";
import { getProfilUser } from "../utils";
import axios from "axios";

const PiedCard = ({ post }) => {
  const profilUser = getProfilUser();

  const [etatLike, setEtatLike] = useState(post.like.likestate);
  const [affichageMessage, setAffichageMessage] = useState(false);

  const [nbrMessages, setNbrMessages] = useState(post.article.nbrmessages);
  const [nbrLike, setNbrLike] = useState(post.article.like);

  const [listMessages, setListMessages] = useState([]);

  const [erreurTrouver, setErreurTrouver] = useState("");
  const [estAJour, setEstAJour] = useState(true);

  useEffect(() => {
    if (affichageMessage) {
      axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/api/post/messages/${post.article.id}`,
        headers: {
          Authorization: `bearer ${profilUser.token}`,
        },
      })
        .then((res) => {
          if (res.data.messages) {
            //  recupere les messages
            setListMessages(res.data.messages);
            setEstAJour(true);
            console.log("useeffect");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [estAJour, affichageMessage]);

  const validationMessage = () => {
    if (document.getElementById("messagepost").value.trim() === "") {
      setErreurTrouver("Message vide");
      return false;
    }
    return true;
  };

  const handleCreateMessage = async () => {
    if (validationMessage()) {
      const data = {
        profilId: profilUser.id,
        articleId: post.article.id,
        content: document.getElementById("messagepost").value,
      };

      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/api/post/message`,
        data: data,
        headers: {
          Authorization: `bearer ${profilUser.token}`,
        },
      })
        .then((res) => {
          console.log(res.data.message);
          setEstAJour(false);
          return res;
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

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
          <p>{nbrLike} like</p>
        </div>
        <div className="commentaire">
          <img
            src="./img/icons/message2.svg"
            title="Commentaires"
            alt="Commentaires"
            onClick={() => setAffichageMessage(!affichageMessage)}
          />
          <p>{nbrMessages} </p>
        </div>
      </div>
      {affichageMessage && (
        <div className="tout_les_messages">
          <div className="creemessage">
            <div>
              <label htmlFor="messagepost">Ecrire un message :</label>
              <input type="text" id="messagepost" />
            </div>
            <div className="cree_message_confirme">
              <p>{erreurTrouver}</p>
              <button onClick={() => handleCreateMessage()}>Envoyer</button>
            </div>
          </div>
          <div className="liste_messages">
            {listMessages.length > 0 ? (
              <ul>
                {/* {listMessages.map((mess) => {
                  <li></li>;
                })} */}
              </ul>
            ) : (
              <p>Aucun messages</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PiedCard;
