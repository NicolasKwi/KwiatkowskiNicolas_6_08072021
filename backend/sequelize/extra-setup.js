function applyExtraSetup(sequelize) {
  const { user, profil, article, message, like } = sequelize.models;

  user.hasOne(profil);

  profil.hasMany(article);
  profil.hasMany(message);
  profil.hasMany(like);

  article.hasMany(message);
  article.hasMany(like);
}

module.exports = { applyExtraSetup };
