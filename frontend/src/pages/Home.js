import React, { useContext } from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import Articles from "../components/Articles"
// import { ProfilContext } from "../components/AppContext";

const Home = () => {
//   const {profilUser, setProfilUser} = useContext(ProfilContext);
// console.log(profilUser);
  return (
    <div>
      <div className="home">
        <h1>Acceuil</h1>
        <Logo />
        <Navigation />
        <Articles />
      </div>
    </div>
  );
};

export default Home;
