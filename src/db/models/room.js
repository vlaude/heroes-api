module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define(
        'Room',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            iconPath: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {}
    );
    Room.associate = function(models) {
        Room.belongsToMany(models.User, {
            through: 'RoomMembers',
            as: 'members',
            foreignKey: 'roomId',
        });
    };

    Room.excludeAttributes = ['createdAt', 'updatedAt'];

    return Room;
};
