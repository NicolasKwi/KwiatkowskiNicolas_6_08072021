import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getProfilUser, delProfilUser } from "./utils";

const Navigation = () => {
  const profilUser = getProfilUser();
  const [psedoProfil, setPsedoProfil] = useState("");

  useEffect(() => {
    // test si on a le profil et le token
    if (!profilUser || !profilUser.id || !profilUser.token) {
      delProfilUser();
      //retour a la page connection
      window.location = "/";
    } else {
      setPsedoProfil(profilUser.pseudonyme);
    }
  }, []);

  return (
    <div className="navigation">
      <NavLink exact to="acceuil" activeClassName="nav-active">
        <img src="./img/icons/home.svg" alt="Icon acceuil" />
        Acceuil
      </NavLink>
      <NavLink exact to="utilisateur" activeClassName="nav-active">
        <img src="./img/icons/user.svg" alt="Icon utilisateur" />
        Utilisateur
      </NavLink>
      <NavLink exact to="/" onClick={() => delProfilUser()}>
        <img src="./img/icons/logout.svg" alt="Icon déconnetion" />
        {`Déconnection - ${psedoProfil}`}
      </NavLink>
    </div>
  );
};

export default Navigation;
