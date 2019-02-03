module.exports = function (sequelize, DataTypes) {
    var Plot = sequelize.define("Plot", {
        title: {
            type: DataTypes.TEXT
        },

        plot_text: {
            type: DataTypes.TEXT
        },

        position: {
            type: DataTypes.INTEGER
        }
    });
  
    Plot.associate = function(models) {
        Plot.belongsTo(models.Story);
    };

    return Plot;
};