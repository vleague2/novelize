module.exports = function (sequelize, DataTypes) {
    var Character = sequelize.define("Character", {
    
    name: {
        type: DataTypes.TEXT
    },

    preview_text: {
        type: DataTypes.TEXT
    },

    character_text: {
        type: DataTypes.TEXT
    },

    character_image: {
        type: DataTypes.TEXT
    }
      
    });
  
    Character.associate = function(models) {
        Character.belongsTo(models.Story);
    };

    return Character;
  };