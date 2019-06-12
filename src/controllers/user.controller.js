const Ajv = require('ajv');

const logger = require('../util/logger');
const userBuilder = require('../builders/user.builder');

const ajv = new Ajv({ allErrors: true });

const userSchema = {
  type: 'object',
  properties: {
    username: {
      type: 'string',
      minLength: 4,
      maxLength: 20,
    },
    hash: {
      type: 'string',
      minLength: 8,
    },
  },
  required: ['username', 'hash'],
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
      const newUser = await userBuilder.createUser(req.body);
      const userAlreadyExist = !newUser[1];
      return userAlreadyExist
        ? res.status(409).send({
            message: `A user with the username ${
              newUser[0].username
            } already exist`,
          })
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
    return user
      ? res.status(200).send(user)
      : res.status(404).send(`No user found for id : ${req.params.id}`);
  } catch (error) {
    logger.error(error);
    return res.status(500).send(`${error.name} : ${error.message}`);
  }
};

module.exports = { getAllUsers, createUser, getUserById };
