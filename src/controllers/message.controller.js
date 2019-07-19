const Ajv = require('ajv');

const logger = require('../util/logger');
const messageBuilder = require('../builders/message.builder');

const ajv = new Ajv({ allErrors: true });

const messageSchema = {
    type: 'object',
    properties: {
        content: {
            type: 'string',
        },
    },
    required: ['content'],
};

const createMessage = async (req, res) => {
    const validate = ajv.compile(messageSchema);
    const isValid = validate(req.body);
    if (isValid) {
        try {
            const poster = req.user;
            const message = await messageBuilder.createMessage(req.body.content, poster);
            return res.status(201).send(message);
        } catch (error) {
            logger.error(error);
            return res.status(500).send(`${error.name} : ${error.message}`);
        }
    } else {
        return res.status(400).send({ error: validate.errors });
    }
};

const getAllMessage = async (req, res) => {
    const messages = await messageBuilder.getAllMessages();
    return res.status(200).send(messages);
};

module.exports = { createMessage, getAllMessage };
