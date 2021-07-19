const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("article", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(1000),
      defaultValue: "",
      validate: {
        len: {
          args: [[0, 1000]],
          msg: "Le contenu doit etre au maximum de 1000 caractères",
        },
      },
    },
    img: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: "",
    },
    lien: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: "",
    },
    nbrmessages: { allowNull: false, type: DataTypes.INTEGER, defaultValue: 0 },
    like: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
