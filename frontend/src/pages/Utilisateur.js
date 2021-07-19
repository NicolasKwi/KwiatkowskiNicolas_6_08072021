import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import Profil from "../components/Profil";
import { getProfilUser, delProfilUser } from "../components/utils";
import { isEmpty } from "../components/utils";
import Entetepage from "../components/Entetepage";

const Utilisateur = () => {
  useEffect(() => {
    const profilUser = getProfilUser();
    // test si on a le profil et le token

    if (isEmpty(profilUser)) {
      delProfilUser();
      //retour a la page connection
      window.location = "/";
    }
  }, []);

  return (
    <div className="utilisateur">
      <Entetepage />
      <Navigation />
      <Profil />
    </div>
  );
};

export default Utilisateur;
