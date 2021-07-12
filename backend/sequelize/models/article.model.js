const { DataTypes } = require("sequelize");

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define("article", {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
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
    img: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lien: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    nbrmessages: { allowNull: false, type: DataTypes.INTEGER, defaultValue: 0 },
    like: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dislike: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
