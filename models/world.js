module.exports = function (sequelize, DataTypes) {
    var World = sequelize.define("World", {
        title: {
            type: DataTypes.TEXT
        },

        world_text: {
            type: DataTypes.TEXT
        }
    });
  
    World.associate = function(models) {
        World.belongsTo(models.Story);
    };

    return World;
};