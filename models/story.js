module.exports = function (sequelize, DataTypes) {
    var Story = sequelize.define("Story", {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        story_text: {
            type: DataTypes.TEXT
        }  
    });
  
    Story.associate = function(models) {
        Story.hasMany(models.Character, { onDelete: 'cascade' });
    };

    Story.associate = function(models) {
        Story.hasMany(models.Plot, { onDelete: 'cascade' });
    };

    Story.associate = function(models) {
        Story.hasMany(models.World, { onDelete: 'cascade' });
    };

    Story.associate = function(models) {
        Story.hasMany(models.Note, { onDelete: 'cascade' });
    };

    Story.associate = function(models) {
        Story.belongsTo(models.User);
    }

    return Story;
};