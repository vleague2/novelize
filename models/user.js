const bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
  var User = sequelize.define("User", {
    googleId: {
      type: DataTypes.STRING
    },
    
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      }

    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  return User;
};