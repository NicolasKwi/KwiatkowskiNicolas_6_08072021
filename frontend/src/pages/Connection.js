import React, { useState } from "react";
import Login from "../components/log/Login";
import Signup from "../components/log/Signup";
import Logo from "../components/Logo";

const Connection = () => {
  const [loginModal, setLoginModal] = useState(true);
  const [signUpModal, setSignUpModal] = useState(false);

  const handleModals = (e) => {
    if (e.target.id === "login-user") {
      setLoginModal(true);
      setSignUpModal(false);
    } else if (e.target.id === "register_user") {
      setLoginModal(false);
      setSignUpModal(true);
    }
  };

  return (
    <div className="connection">
             
      <div className="log-contener">
        <img src="./img/icon-above-font.svg" alt="Logo" />
        <ul>
          <li
            onClick={handleModals}
            id="login-user"
            className={loginModal ? "active-btn" : null}
          >
            Se connecter
          </li>
          <li
            onClick={handleModals}
            id="register_user"
            className={signUpModal ? "active-btn" : null}
          >
            S'inscrire
          </li>
        </ul>
        {loginModal && <Login />}
        {signUpModal && <Signup />}
      </div>
    </div>
  );
};

export default Connection;
