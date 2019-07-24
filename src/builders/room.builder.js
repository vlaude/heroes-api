const { Room } = require('../db/models');

const getAllRooms = () => Room.findAll({ attributes: { exclude: Room.excludeAttributes } });

const createRoom = room =>
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

module.exports = {
    getAllRooms,
    createRoom,
    getRoomById,
};