const { DataTypes } = require("sequelize");

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define("profil", {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
    id: {
      //   allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      //   validate: {
      //     notNull: true
      //   }
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
