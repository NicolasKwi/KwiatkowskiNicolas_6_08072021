import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import Articles from "../components/Articles";
import CreeArticle from "../components/CreeArticle";
import { getProfilUser, delProfilUser } from "../components/utils";
import Entetepage from "../components/Entetepage";

const Home = () => {
  useEffect(() => {
    const profilUser = getProfilUser();
    // test si on a le profil et le token
    if (!profilUser || !profilUser.id || !profilUser.token) {
      delProfilUser();
      //retour a la page connection
      window.location = "/";
    }
  }, []);

  return (
    <div>
      <div className="home">
        <Entetepage />
        <Navigation />
        <CreeArticle />
        <Articles />
      </div>
    </div>
  );
};

export default Home;
