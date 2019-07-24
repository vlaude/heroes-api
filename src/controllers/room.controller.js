const Ajv = require('ajv');

const config = require('../config');
const logger = require('../util/logger');
const roomBuilder = require('../builders/room.builder');

const ajv = new Ajv({ allErrors: true });

const roomSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
        },
        iconPath: {
            type: 'string',
        },
    },
    required: ['name'],
};

const getAllRooms = async (req, res) => {
    const rooms = await roomBuilder.getAllRooms();
    res.status(200).send(rooms);
};

const createRoom = async (req, res) => {
    const validate = ajv.compile(roomSchema);
    const isValid = validate(req.body);
    if (isValid) {
        try {
            const newRoom = await roomBuilder.createRoom(req.body);
            const roomAlreadyExist = !newRoom[1];
            return roomAlreadyExist
                ? res.status(409).send({ message: `A room with the name ${newRoom[0].name} already exist` })
                : res.status(201).send(newRoom[0]);
        } catch (error) {
            logger.error(error);
            return res.status(500).send(`${error.name} : ${error.message}`);
        }
    } else {
        return res.status(400).send({ error: validate.errors });
    }
};

module.exports = { getAllRooms, createRoom };
