import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import Articles from "../components/Articles"

const Home = () => {
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
