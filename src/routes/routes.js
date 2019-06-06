const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const hpp = require('hpp');
const helmet = require('helmet');

const api = express();
const apiRoutes = express.Router();

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(cors());
// api.use(hpp);
api.use(helmet());

apiRoutes.get('/', (req, res) => {
  res.status(200).send({ message: `Hello from my awesome API !` });
});

api.use('/api/v1', apiRoutes);

module.exports = api;
