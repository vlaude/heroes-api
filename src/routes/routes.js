const express = require('express');
// Pino logger for express api
const pino = require('../util/logger');
const bodyParser = require('body-parser');

// Helmet helps you secure your Express apps by setting various HTTP headers
const helmet = require('helmet');
const cors = require('cors');

const api = express();
const apiRoutes = express.Router();

api.use(pino);
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(helmet());
api.use(cors());

apiRoutes.get('/', (req, res) => {
  res.status(200).send({ message: `Hello from my awesome API !` });
});

api.use('/api/v1', apiRoutes);

module.exports = api;
