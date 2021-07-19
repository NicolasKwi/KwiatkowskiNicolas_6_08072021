import React from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation"
import Profil from "../components/Profil";




const Utilisateur = () => { 

  return (
    <div className="utilisateur">
      <h1>Utilisateur</h1>
      <Logo />
      <Navigation />
      <Profil />    
    </div>
  );
};

export default Utilisateur;
