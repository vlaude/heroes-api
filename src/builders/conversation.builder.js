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

const getConversationByRoomId = roomId =>
    Conversation.findAll({
        where: { roomId },
        attributes: {
            exclude: Conversation.excludeAttributes,
        },
    });

const markAsRead = conv => {
    conv.update({
        isRead: true,
    });
};

const markAsNoread = conv => {
    conv.update({
        isRead: false,
    });
};

module.exports = { createConversation, getConversationsByUserId, getConversationByRoomId, markAsRead, markAsNoread };
