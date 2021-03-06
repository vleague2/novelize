module.exports = function (sequelize, DataTypes) {
    var Note = sequelize.define("Note", {
        title: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        note_text: {
            type: DataTypes.TEXT
        }
    });

    Note.associate = function(models) {
        Note.belongsTo(models.Story);
    };

    return Note;
};