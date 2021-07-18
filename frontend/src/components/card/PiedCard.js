import React, { useState, useEffect } from "react";
import { getProfilUser } from "../utils";
import axios from "axios";
import { dateParser } from "../utils";

const PiedCard = ({ post }) => {
  const profilUser = getProfilUser();

  const [etatLike, setEtatLike] = useState(post.like.likestate);
  const [affichageMessage, setAffichageMessage] = useState(false);

  const [nbrMessages, setNbrMessages] = useState(post.article.nbrmessages);
  const [nbrLike, setNbrLike] = useState(post.article.like);

  const [listMessages, setListMessages] = useState([]);

  const [erreurTrouver, setErreurTrouver] = useState("");
  const [mesEstAJour, setMesEstAJour] = useState(true);
  const [delEstAJour, setDelEstAJour] = useState(true);

  //recupere les messages
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
            setMesEstAJour(true);
            setDelEstAJour(true)
            console.log("use effect");
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, [affichageMessage,mesEstAJour,delEstAJour]);

  const validationMessage = () => {
    try {
      if (
        document
          .getElementById(`messagepost_${post.article.id}`)
          .value.trim() === ""
      ) {
        setErreurTrouver("Message vide");
        return false;
      }
      setErreurTrouver("");
      return true;
    } catch (error) {
      return false;
    }
  };
  //cree les messages
  const handleCreateMessage = async () => {
    if (validationMessage()) {
      const contentMessagePost = document.getElementById(
        `messagepost_${post.article.id}`
      );
      const data = {
        profilId: profilUser.id,
        articleId: post.article.id,
        content: contentMessagePost.value,
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
          setListMessages([]);
          setNbrMessages(nbrMessages + 1);
          setMesEstAJour(false);
          contentMessagePost.value = "";
          return res;
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  //supprmession d'un message
  const handleDeleteMessage = async (e) => {
    const data = {
      profilId: profilUser.id,
      articleId: post.article.id,
    };
    if (e.target.dataset && e.target.dataset.idmessage) {
      await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}/api/post/message/${e.target.dataset.idmessage}`,
        data: data,
        headers: {
          Authorization: `bearer ${profilUser.token}`,
        },
      })
        .then((res) => {
          setListMessages([]);
          setNbrMessages(nbrMessages - 1);
          setDelEstAJour(false);
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
              <label htmlFor={`messagepost_${post.article.id}`}>
                Ecrire un message :
              </label>
              <input type="text" id={`messagepost_${post.article.id}`} />
            </div>
            <div className="cree_message_confirme">
              <p>{erreurTrouver}</p>
              <button onClick={() => handleCreateMessage()}>Envoyer</button>
            </div>
          </div>
          <div className="liste_messages">
            {listMessages.length > 0 ? (
              <ul>
                {listMessages.map((mess) => (
                  <li key={`message_${post.article.id}_${mess.message.id}`}>
                    <div className="message">
                      <div className="message__entete">
                        {mess.profil.avatar ? (
                          <img src={mess.profil.avatar} alt="Avatar" />
                        ) : (
                          <img
                            src="./img/random-user.png"
                            alt="Avatar par defaut"
                          />
                        )}
                        <div className="identite">
                          <p className="identite_psedo">
                            {mess.profil.pseudonyme}
                          </p>
                          <p className="identite_fonction">
                            {mess.profil.fonction}
                          </p>
                        </div>
                        <div className="entete_espace"> </div>
                        <div className="horaire_message">
                          <p className="date_message">
                            Écrie le {dateParser(mess.message.createdAt)}
                          </p>
                        </div>
                      </div>
                      <div className="message_corps">
                        <p className="message_corps_content">
                          {mess.message.content}
                        </p>
                      </div>
                      {mess.profil.id === profilUser.id && (
                        <div className="message_supprime">
                          <img
                            src="./img/icons/trash.svg"
                            title="Supprimer"
                            data-idmessage={mess.message.id}
                            onClick={(e) => {
                              handleDeleteMessage(e);
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </li>
                ))}
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
