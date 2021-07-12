import React, { useState } from "react";
import axios from "axios";
const Data = require("../../service/data");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const loginError = document.querySelector(".login_error");
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}/api/auth/login`,
      // withCredentials: true,
      data: {
        email: email,
        password: password,
      },
    })
      .then((res) => {
        if (!res.data.profil || !res.data.token) {
          loginError.innerHTML = "Profil non trouvé";
        } else {
          Data.profil = res.data.profil;
          Data.token = res.data.token;
         window.location = "/acceuil";
        }
      })
      .catch((err) => {     
        if (err.response.data.error) {
          loginError.innerHTML = err.response.data.error;
          console.log(err.response.data.error);
        } else {
          console.log(err);
        }
      });
  };

  return (
    <div className="login">
      <h1>Connection :</h1>
      <form className="login-form" action="" onSubmit={handleLogin}>
        <label htmlFor="login_email">E-mail : </label>
        <input
          type="email"
          name="login_email"
          id="login_email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />

        <label htmlFor="login_password">Mot de passe : </label>
        <input
          type="password"
          name="login_password"
          id="login_password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <div className="login_error"></div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
