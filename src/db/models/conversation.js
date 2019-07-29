module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define(
        'Conversation',
        {
            isRead: DataTypes.BOOLEAN,
        },
        {}
    );
    Conversation.associate = models => {
        // associations can be defined here
        Conversation.belongsTo(models.User, { as: 'user' });
        Conversation.belongsTo(models.Room, { as: 'room' });
    };

    Conversation.excludeAttributes = ['createdAt', 'updatedAt'];

    return Conversation;
};
