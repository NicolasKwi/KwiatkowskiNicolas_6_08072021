import React, { useState, useEffect } from "react";
import { getProfilUser } from "../utils";
import axios from "axios";
import { dateParser } from "../utils";

const PiedCard = ({ post }) => {
  const profilUser = getProfilUser();

  const [etatLike, setEtatLike] = useState(0);
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
            setDelEstAJour(true);
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
    //recupere l'etat like
    handleEtatLike();
  }, [affichageMessage, mesEstAJour, delEstAJour]);

  // recupere l'état de like
  const handleEtatLike = () => {
    const data = {
      profilId: profilUser.id,
      like: etatLike,
    };

    axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}/api/post/${post.article.id}/like/${profilUser.id}`,
      data: data,
      headers: {
        Authorization: `bearer ${profilUser.token}`,
      },
    })
      .then((res) => {
        if (res.data.like) {
          res.data.like === 1 ? setEtatLike(1) : setEtatLike(0);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  //update des likes
  const handleUpdatelikepost = () => {
    let tempEtatLike = etatLike;
    tempEtatLike === 0 ? (tempEtatLike = 1) : (tempEtatLike = 0);
    const data = {
      profilId: profilUser.id,
      like: tempEtatLike,
    };

    //api update like
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}/api/post/${post.article.id}/like`,
      data: data,
      headers: {
        Authorization: `bearer ${profilUser.token}`,
      },
    })
      .then((res) => {
        setEtatLike(tempEtatLike);
        if (tempEtatLike === 0) {
          setNbrLike(nbrLike - 1);
        } else if (tempEtatLike === 1) {
          setNbrLike(nbrLike + 1);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

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
          <img
            src={
              etatLike === 0
                ? "./img/icons/heart.svg"
                : "./img/icons/heart-filled.svg"
            }
            title="Like"
            alt="liker"
            onClick={() => handleUpdatelikepost()}
          />
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
            <div className="messcontent_cree">
              <label htmlFor={`messagepost_${post.article.id}`}>
                Ecrire un message :
              </label>
              <input type="text" id={`messagepost_${post.article.id}`} />
            </div>
            <div className="cree_message_confirme">
              <button onClick={() => handleCreateMessage()}>Envoyer</button>
              <p>{erreurTrouver}</p>
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
                        </p>{" "}
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
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="aucun_message">Aucun messages</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PiedCard;
