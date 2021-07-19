const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("message", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING(1000),
      validate: {
        len: {
          args: [[0, 1000]],
          msg: "Le contenu doit etre au maximum de 1000 caractères",
        },
      },
    },
  });
};
