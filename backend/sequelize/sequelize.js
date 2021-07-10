const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
require('dotenv').config()


const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_LOGIN, process.env.MYSQL_PASSWORD, {
	host: process.env.MYSQL_HOST,
	dialect: 'mysql',
	logging: false,
  });

const modelDefiners = [	
	require('./models/user.model'),
	require('./models/profil.model'),
	require('./models/article.model'),
	require('./models/message.model'),	
	require('./models/like.model'),	
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

sequelize.sync();
console.log('sequelize.sync()')	
//test
// sequelize.models.user.create({login:'aaaaerffff@fgdgf.com',password:'sssssss'}).catch(error =>console.log('login erreur = ' + error) )

 

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;