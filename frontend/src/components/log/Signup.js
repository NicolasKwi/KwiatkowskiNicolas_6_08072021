import React from "react";

const Signup = () => {
  return (
    <div className="signup">
      <h1>Inscription :</h1>

      <form className="signup-form" action="">
        <label htmlFor="signup_email">E-mail : </label>
        <input type="email" id="signup_email" />

        <label htmlFor="signup_password">Mot de passe : </label>
        <input type="password" id="signup_password" />

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
