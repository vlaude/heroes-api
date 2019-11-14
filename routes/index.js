const express = require('express');
const bodyParser = require('body-parser');
const xhub = require('express-x-hub');

const cors = require('cors');
// const hpp = require('hpp');
const helmet = require('helmet');

const { initAuth, isAuthenticated } = require('../middlewares/auth');
const apiAuth = require('./auth.route');
const apiUsers = require('./user.route');
const apiMessages = require('./message.route');
const apiOAuth = require('./oauth');

const api = express();
initAuth();

const apiRoutes = express.Router();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
const xhubSecret = 'MySecretKey';
api.use(xhub({ algorithm: 'sha1', secret: xhubSecret }));

api.use(cors());
// api.use(hpp);
api.use(helmet());

apiRoutes.get('/', (req, res) => {
  res.status(200).send({ message: 'Hello from the awesome heroes api !' });
});

apiRoutes
  .use('/auth', apiAuth)
  .use('/users', apiUsers)
  .use('/messages', apiMessages)
  .use(isAuthenticated)
  .get('/checkJwt', (req, res) => {
    res.status(200).send({ message: 'Your token is valid :-)' });
  })
  .use((err, req, res, next) => {
    res.status(403).send({
      success: false,
      message: `${err.name} : ${err.message}`,
    });
    next();
  });

api.use(apiOAuth);
api.use('/api/v1', apiRoutes);

module.exports = api;
