const Ajv = require('ajv');

const config = require('../config');
const logger = require('../util/logger');
const userBuilder = require('../builders/user.builder');
const convBuilder = require('../builders/conversation.builder');
const convService = require('../services/conversation.service');

const ajv = new Ajv({ allErrors: true });

const userSchema = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            minLength: 4,
            maxLength: 20,
        },
        password: {
            type: 'string',
            minLength: 8,
        },
    },
    required: ['username', 'password'],
};

const getAllUsers = async (req, res) => {
    const users = await userBuilder.getAllUsers();
    res.status(200).send(users);
};

const createUser = async (req, res) => {
    const validate = ajv.compile(userSchema);
    const isValid = validate(req.body);
    if (isValid) {
        try {
            const model = { username: req.body.username, hash: req.body.password };
            // TODO Service create user with convs.
            const newUser = await userBuilder.createUser(model);
            const convs = await convService.createConvsForUserAndPublicRooms(newUser[0]);
            const userAlreadyExist = !newUser[1];
            return userAlreadyExist
                ? res.status(409).send({ message: `A user with the username ${newUser[0].username} already exist` })
                : res.status(201).send(newUser[0]);
        } catch (error) {
            logger.error(error);
            return res.status(500).send(`${error.name} : ${error.message}`);
        }
    } else {
        return res.status(400).send({ error: validate.errors });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await userBuilder.getUserById(req.params.id);
        if (user) {
            // A simple user is not authorized to get another one.
            if (req.user.id !== user.id && req.user.role < config.userRoles.ADMIN) {
                res.sendStatus(403);
            } else {
                res.status(200).send(user);
            }
        } else {
            res.status(404).send({ message: `No user found for id : ${req.params.id}` });
        }
    } catch (error) {
        logger.error(error);
        res.status(500).send(`${error.name} : ${error.message}`);
    }
};

const getUserConversations = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).send('Missing userId param');
        } else {
            const convs = await convBuilder.getConversationsByUserId(req.params.id);
            res.status(200).send(convs);
        }
    } catch (error) {
        logger.error(error);
        res.status(500).send(`${error.name} : ${error.message}`);
    }
};

module.exports = { getAllUsers, createUser, getUserById, getUserConversations };
