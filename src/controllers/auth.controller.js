const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');

const { getUserByUsernameWithHash } = require('../builders/user.builder');
const logger = require('../util/logger');

const loginUser = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ message: `username and password required` });
  }
  try {
    let user = await getUserByUsernameWithHash(req.body.username);
    user = user.get({ plain: true });
    if (user) {
      bcrypt.compare(req.body.password, user.hash, (err, result) => {
        if (err || !result) {
          res.status(401).send('username and password missmatch');
        } else {
          const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET);
          res.status(201).send(token);
        }
      });
    }
  } catch (error) {
    logger.error(error);
    res.status(500).send(`${error.name} : ${error.message}`);
  }
};

module.exports = { loginUser };
