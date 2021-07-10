const { DataTypes } = require("sequelize");

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define("user", {
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
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: "Le login doit etre une email",
        },
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
};
