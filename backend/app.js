const express = require("express");
const sequelize = require('./sequelize/sequelize');
require('dotenv').config()
//securiter
const rateLimit = require("express-rate-limit");

const session = require('cookie-session');

//routes
const authRoutes = require("./routes/authentification");
 const postRoutes = require("./routes/post");

const path = require("path");

const app = express();




sequelize.authenticate().then( console.log('Connection Mysql etablie avec success')).catch( (error)=>{
  console.error('Unable to connect to the database:', error);
})

// 
// mongoose
//   .connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }
//   )
//   .then(() => console.log("Connexion à MongoDB réussie !"))
//   .catch(() => console.log("Connexion à MongoDB échouée !"));

//
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  //securité supplementaire (xss, injections de contenu)
  res.setHeader('Content-Security-Policy', "default-src 'self'");
  next();
});
// securisation cookies
app.use(session({ 
  secret: 'Lasaucepiquante',
  name: 'sessionPiquante',
  cookie: {
    httpOnly: true,
    secure: true,
    domain: 'http://localhost:'+ process.env.PORT,
    // Cookie will expire in 1 hour from when it's generated
    expires: new Date( Date.now() + 60 * 60 * 1000 )
  }
}));


//body parser deprecier -> app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//*** Securiter ***

// Calling the ratelimiter function with its options
// max: Contains the maximum number of requests
// windowsMs: Contains the time in milliseconds to receive max requests
// message: message to be shown to the user on rate-limit
const limiter = rateLimit({
  max: 10,
  windowMs: 5 * 1000, // pour 5 secondes
  message: "Trop de requêtes venant de cette adresse IP"
});
// Adding the rate-limit function to the express middleware so
// that each requests passes through this limit before executing
app.use(limiter);

app.use("/images", express.static(path.join(__dirname, "images")));

// ***** ROUTES *****
app.use("/api/auth", authRoutes);
 app.use("/api/post", postRoutes);

module.exports = app;
