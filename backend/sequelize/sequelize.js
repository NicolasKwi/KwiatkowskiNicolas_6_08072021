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

const modelDefiners = [
  require("./models/user.model"),
  require("./models/profil.model"),
  require("./models/article.model"),
  require("./models/message.model"),
  require("./models/liked.model"),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

console.log("sequelize sync ");
sequelize.sync();

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
