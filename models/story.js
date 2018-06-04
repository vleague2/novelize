module.exports = function (sequelize, DataTypes) {
    var Story = sequelize.define("Story", {
    
    title: {
        type: DataTypes.TEXT
    },

    story_text: {
        type: DataTypes.TEXT
    }
      
    });
  
    Story.associate = function(models) {
        Story.hasMany(models.Character);
    };

    // Story.associate = function(models) {
    //     Story.hasMany(models.Plot);
    // };

    Story.associate = function(models) {
        Story.hasMany(models.World);
    };

    Story.associate = function(models) {
        Story.hasMany(models.Note);
    };

    Story.associate = function(models) {
        Story.belongsTo(models.User);
    }

    return Story;
  };