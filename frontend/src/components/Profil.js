import React from "react";

const Profil = () => {
  return (
    <div className="profil">
      <form action="">
        <div className="avatar">
          <img src="./img/soja.jpg" alt="Avatar" />
          <input type="file" id="file" />
        </div>
        <div>
          <label htmlFor="psedo">Psedonyme : </label>
          <input type="text" id="psedo" />
        </div>
        <div>
          <label htmlFor="">Fonction : </label>
          <input type="text" id="fonction" />
        </div>
        <div className="button_modif">
            <p>Enregister !!</p>
          <button type="submit">Enregistrer</button>
          <button type="button">Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default Profil;
