import React from "react";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation"
import Profil from "../components/Profil";
import UserArticles from "../components/UserArticles"

const Data =require('../service/data');

const Utilisateur = () => { 
  // console.log(Data);
  return (
    <div className="utilisateur">
      <h1>Utilisateur</h1>
      <Logo />
      <Navigation />
      <Profil />
      <UserArticles />
    </div>
  );
};

export default Utilisateur;
