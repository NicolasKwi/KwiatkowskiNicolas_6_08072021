const { Sequelize } = require("sequelize");
const { applyExtraSetup } = require("./extra-setup");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_LOGIN,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(console.log("Connection Mysql etablie avec success"))
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
//recupere les models
const modelDefiners = [
  require("./models/user.model"),
  require("./models/profil.model"),
  require("./models/article.model"),
  require("./models/message.model"),
  require("./models/liked.model"),
];

// défini les models
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// exécution de toutes configuration supplémentaire après la définition des modèles, comme l'ajout d'associations .
applyExtraSetup(sequelize);

//synchronisation des tables
sequelize.sync();

module.exports = sequelize;
