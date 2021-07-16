function applyExtraSetup(sequelize) {
  const { user, profil, article, message, like } = sequelize.models;

  user.hasOne(profil);

  profil.hasMany(article, {
    onDelete: "cascade",
    hooks: true,
  });
  profil.hasMany(message, { 
    onDelete: 'cascade',
    hooks: true, 
  });
  profil.hasMany(like, { 
    onDelete: 'cascade',
    hooks: true, 
  });

  article.hasMany(message, { 
    onDelete: 'cascade',
    hooks: true, 
  });
  article.hasMany(like, { 
    onDelete: 'cascade',
    hooks: true, 
  });
}

module.exports = { applyExtraSetup };
