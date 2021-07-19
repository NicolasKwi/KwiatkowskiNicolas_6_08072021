const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "liked",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: false }
  );
};
