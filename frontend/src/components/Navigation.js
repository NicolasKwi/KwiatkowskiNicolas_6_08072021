import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="navigation">
      <NavLink exact to="acceuil" activeClassName="nav-active">
        Acceuil
      </NavLink>
      <NavLink exact to="utilisateur" activeClassName="nav-active">
        Utilisateur
      </NavLink>
      <NavLink exact to="/" >
        Déconnection
      </NavLink>
    </div>
  );
};

export default Navigation;
