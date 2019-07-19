module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define(
        'Message',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {}
    );
    Message.associate = models => {
        Message.belongsTo(models.User, {
            as: 'poster',
        });
    };

    Message.excludeAttributes = ['createdAt', 'updatedAt', 'posterId'];

    return Message;
};
