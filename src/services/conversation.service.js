const convBuilder = require('../builders/conversation.builder');
const roomBuilder = require('../builders/room.builder');

/**
 * Crée une conversation dans toutes les room publiques pour un user.
 * @param user
 * @returns {Promise<any[]>}
 */
const createConvsForUserAndPublicRooms = async user => {
    const publicRooms = await roomBuilder.getAllRooms();
    const promisesConv = [];
    publicRooms.forEach(room => {
        promisesConv.push(convBuilder.createConversation(user, room));
    });

    return Promise.all(promisesConv);
};

/**
 * Indique qu'une conversation est lue en fonction du user et de la room.
 * @param userId
 * @param roomId
 * @returns {Promise<*>}
 */
const markConvAsReadByUserAndRoom = async (userId, roomId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const convs = await convBuilder.getConversationsByUserId(userId);
            let conv = convs.find(c => c.roomId === roomId);
            conv = await convBuilder.markAsRead(conv);
            resolve(conv);
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Marque toutes les conversations de la room comme non lue sauf pour le poster.
 * @param room
 * @returns {Promise<void>}
 */
const markAllConvAsNoreadByRoom = async (posterId, roomId) => {
    const promisesConv = [];
    let conversations = await convBuilder.getConversationByRoomId(roomId);
    conversations = conversations.filter(conv => conv.userId !== posterId);
    conversations.forEach(conv => {
        promisesConv.push(convBuilder.markAsNoread(conv));
    });
    return Promise.all(promisesConv);
};

module.exports = { createConvsForUserAndPublicRooms, markConvAsReadByUserAndRoom, markAllConvAsNoreadByRoom };
