const Ajv = require('ajv');

const logger = require('../util/logger');
const roomBuilder = require('../builders/room.builder');
const roomService = require('../services/room.service');

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
        type: {
            enum: ['PRIVATE', 'PROJECT'],
        },
    },
    required: ['name', 'type'],
};

const roomPublicSchema = {
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
    try {
        const rooms = await roomBuilder.getAllPublicRooms();
        res.status(200).send(rooms);
    } catch (error) {
        logger.error(error);
        res.status(500).send(`${error.name} : ${error.message}`);
    }
};

const getAllJoinedRooms = async (req, res) => {
    try {
        const roomsJoined = await roomService.getAllJoinedRooms(req.user);
        res.status(200).send(roomsJoined);
    } catch (error) {
        logger.error(error);
        res.status(500).send(`${error.name} : ${error.message}`);
    }
};

const createRoom = async (req, res) => {
    const validate = ajv.compile(roomSchema);
    const isValid = validate(req.body);
    if (isValid) {
        try {
            const newRoom = await roomService.createRoom(req.user, req.body);
            return res.status(201).send(newRoom);
        } catch (error) {
            logger.error(error);
            return res.status(500).send(`${error.name} : ${error.message}`);
        }
    } else {
        return res.status(400).send({ error: validate.errors });
    }
};

const createPublicRoom = async (req, res) => {
    const validate = ajv.compile(roomPublicSchema);
    const isValid = validate(req.body);
    if (isValid) {
        try {
            const newRoom = await roomService.createPublicRoom(req.body);
            return res.status(201).send(newRoom);
        } catch (error) {
            logger.error(error);
            return res.status(error.status || 500).send(error.message || `${error.name} : ${error.message}`);
        }
    } else {
        return res.status(400).send({ error: validate.errors });
    }
};

module.exports = { getAllRooms, getAllJoinedRooms, createRoom, createPublicRoom };
