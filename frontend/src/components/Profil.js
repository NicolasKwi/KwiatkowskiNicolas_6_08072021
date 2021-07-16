import React from "react";
import fs from "fs";

const Profil = () => {
  const handlePicture = (e) => {
   console.log(e.target.files[0]);
    fs.writeFile("/img/helloworld.jpg", e.target.files[0], function (err) {
      if (err) return console.log(err);
      console.log("Hello World > helloworld.txt");
    });
  };

  return (
    <div className="profil">
      <form action="">
        <div className="avatar">
          <img src="" alt="Avatar" />
          <input
            type="file"
            id="file"
            name="file"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handlePicture(e)}
          />
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
