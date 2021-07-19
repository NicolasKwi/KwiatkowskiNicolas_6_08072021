const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("profil", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    pseudonyme: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        len: {
          args: [[3, 35]],
          msg: "Votre pseudonyme doit avoir entre 3 et 35 caractères",
        },
      },
    },
    avatar: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    fonction: {
      allowNull: true,
      type: DataTypes.STRING,
    },
  });
};
