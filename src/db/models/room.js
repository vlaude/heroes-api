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
            },
            iconPath: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            type: {
                type: DataTypes.ENUM('PUBLIC', 'PRIVATE', 'PROJECT'),
                allowNull: false,
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
        Room.hasMany(models.Message, { as: 'messages', foreignKey: 'roomId' });
    };

    Room.excludeAttributes = ['createdAt', 'updatedAt'];

    return Room;
};
