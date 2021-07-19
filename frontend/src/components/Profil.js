import React, { useEffect, useState } from "react";
import axios from "axios";
import { getProfilUser, setProfilUser, isEmpty, delProfilUser } from "./utils";

const Profil = () => {
  let profilUser = getProfilUser();

  const [psedoOrigine, setPsedoOrigine] = useState("");
  const [fonctionOrigine, setFonctionOrigine] = useState("");
  const [avatarOrigine, setAvatarOrigine] = useState("");

  const [psedoModif, setPsedoModif] = useState("");
  const [fonctionModif, setFonctionModif] = useState("");
  const [avatarModif, setAvatarModif] = useState("");

  const [file, setFile] = useState();

  const [messErreur, setMessErreur] = useState("");
  const [mess, setMess] = useState("");

  useEffect(() => {   
    if (isEmpty(profilUser)) {     
      delProfilUser();
      window.location = "/";
    } else {
      if (isEmpty(profilUser.fonction)) profilUser.fonction = "";
      if (isEmpty(profilUser.avatar)) profilUser.avatar = "";

      setPsedoOrigine(profilUser.pseudonyme);
      setFonctionOrigine(profilUser.fonction);
      setAvatarOrigine(profilUser.avatar);

      setPsedoModif(profilUser.pseudonyme);
      setFonctionModif(profilUser.fonction);
      setAvatarModif(profilUser.avatar);
    }
  }, []);

  //udpate du profil
  const handleUpdateProfil = () => {
    // test de validiter
    if (testIdentiqueProfil()) {
      setMess("");
      setMessErreur("Le profil est identique");
      return;
    }

    const psedoTrim = psedoModif.trim();
    const fonctionTrim = isEmpty(fonctionModif) ? "" : fonctionModif.trim();

    if (psedoTrim !== "" && psedoTrim.length > 2) {
      const data = new FormData();
      data.append("profilId", profilUser.id);
      data.append("pseudonyme", psedoTrim);
      data.append("fonction", fonctionTrim);
      data.append("avatar", avatarModif);
      if (file) data.append("image", file);

      axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}/api/post/profil/1`,
        data: data,
        headers: {
          Authorization: `bearer ${profilUser.token}`,
        },
      })
        .then((res) => {
          if (res.data) {
            profilUser.avatar = res.data.avatar;
            profilUser.pseudonyme = res.data.pseudonyme && res.data.pseudonyme;
            profilUser.fonction = res.data.fonction && res.data.fonction;
            setProfilUser(profilUser);

            setPsedoOrigine(profilUser.pseudonyme);
            setFonctionOrigine(profilUser.fonction);
            setAvatarOrigine(profilUser.avatar);

            setPsedoModif(profilUser.pseudonyme);
            setFonctionModif(profilUser.fonction);
            setAvatarModif(profilUser.avatar);

            setMess(res.data.message);
            setMessErreur("");
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      setMessErreur("Le pseudonyme est inferieur à 3 Caractères ou est vide");
      setMess("");
    }
  };

  // réinitialise les champs modifier
  const handleAnnuler = () => {
    setPsedoModif(psedoOrigine);
    setFonctionModif(fonctionOrigine);
    setAvatarModif(avatarOrigine);
    setMessErreur("");
    setMess("");
  };

  //selection de l'image
  const handlePicture = (e) => {
    setAvatarModif(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };
  const testIdentiqueProfil = () => {
    if (
      psedoModif === psedoOrigine &&
      fonctionModif === fonctionOrigine &&
      avatarModif === avatarOrigine
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="profil">
      <div>
        <div className="cree_profilimage">
          {avatarModif && (
            <img
              src={avatarModif}
              alt="affichage de la selection"
            />
          )}
          <div className="profilimage_bouttons">
            <label className="label_inputfile" htmlFor="imageprofil_Modif">
              Choissez une image :
            </label>
            <input
              className="imageprofil_Modif_file"
              type="file"
              id="imageprofil_Modif"
              name="imageprofil_Modif"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => {
                handlePicture(e);
              }}
            />
            {avatarModif && (
              <button
                onClick={() => {
                  setAvatarModif("");
                  document.getElementById("imageprofil_Modif").value = "";
                }}
              >
                Supprimer
              </button>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="psedo_profil">Psedonyme : </label>
          <input
            type="text"
            id="psedo_profil"
            value={psedoModif}
            onChange={(e) => setPsedoModif(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="fonction_profil">Fonction : </label>
          <input
            type="text"
            id="fonction_profil"
            value={fonctionModif}
            onChange={(e) => setFonctionModif(e.target.value)}
          />
        </div>
        <div className="button_modif">
          <div className="mess_err_profil">
            <p className="mess_profil">{mess}</p>
            <p className="erreur_profil">{messErreur}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              handleUpdateProfil();
            }}
          >
            Enregistrer
          </button>
          <button
            type="button"
            onClick={() => {
              handleAnnuler();
            }}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profil;
