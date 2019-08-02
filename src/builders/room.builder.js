const { Room, Message, User } = require('../db/models');

/**
 * Get all the rooms with messages their poster.
 */
const getAllPublicRooms = () =>
    Room.findAll({
        where: {
            type: 'PUBLIC',
        },
        attributes: { exclude: Room.excludeAttributes },
        include: [
            {
                model: Message,
                as: 'messages',
                attributes: {
                    exclude: Message.excludeAttributes,
                },
                include: [
                    {
                        model: User,
                        as: 'poster',
                        attributes: {
                            exclude: User.excludeAttributes,
                        },
                    },
                ],
            },
        ],
    });

const createRoom = room =>
    new Promise(async (resolve, reject) => {
        try {
            const newRoom = await Room.create(room);
            // Can't exclude attributes from a Create.
            Room.excludeAttributes.forEach(att => {
                delete newRoom[att];
            });
            resolve(newRoom);
        } catch (error) {
            reject(error);
        }
    });

/**
 * Public room's name must be unique.
 */
const createPublicRoom = room =>
    Room.findOrCreate({
        where: {
            name: room.name,
        },
        defaults: room,
    }).spread((newRoom, created) => {
        if (created) {
            const newRoomMinified = newRoom.get({ plain: true });
            Room.excludeAttributes.forEach(att => {
                delete newRoomMinified[att];
            });
            return [newRoomMinified, created];
        }
        return [newRoom, created];
    });

const getRoomById = id =>
    Room.findOne({
        where: {
            id,
        },
        attributes: {
            exclude: Room.excludeAttributes,
        },
    });

/**
 * Add members to a room, and return the room with the new members.
 */
const addMembers = (room, members) =>
    new Promise(async (resolve, reject) => {
        try {
            // Add the members
            await room.addMembers(members);
            // Return the room with its members
            const roomWithNewMembers = await Room.findOne({
                where: { id: room.id },
                attributes: {
                    exclude: Room.excludeAttributes,
                },
                include: [
                    {
                        model: User,
                        as: 'members',
                        attributes: {
                            exclude: User.excludeAttributes,
                        },
                        through: { attributes: [] },
                    },
                ],
            });
            resolve(roomWithNewMembers);
        } catch (error) {
            reject(error);
        }
    });

module.exports = {
    getAllPublicRooms,
    createRoom,
    createPublicRoom,
    getRoomById,
    addMembers,
};
