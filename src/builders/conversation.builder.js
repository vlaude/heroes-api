const { Conversation } = require('../db/models');

const createConversation = (user, room) => {
    return new Promise(async (resolve, reject) => {
        try {
            const conversation = await Conversation.create({
                isRead: false,
            });
            await conversation.setUser(user.id);
            await conversation.setRoom(room.id);
            resolve(conversation);
        } catch (error) {
            reject(error);
        }
    });
};

const getConversationsByUserId = userId =>
    Conversation.findAll({
        where: { userId },
        attributes: {
            exclude: Conversation.excludeAttributes,
        },
    });

const markAsRead = conv => {
    Conversation.update({
        isRead: true,
        where: { id: conv.id },
    });
};

const markAsNoread = conv => {
    Conversation.update({
        isRead: false,
        where: { id: conv.id },
    });
};

module.exports = { createConversation, getConversationsByUserId, markAsRead, markAsNoread };
