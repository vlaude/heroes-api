const express = require('express');
const bodyParser = require('body-parser');
const hpp = require('hpp');
const helmet = require('helmet');

const api = express();
api.use(express.json({ limit: '1mb' }));
const apiRoutes = express.Router();

api.use(bodyParser.urlencoded());
// api.use(hpp);
api.use(helmet());

apiRoutes.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello from the awesome heroes api !' });
});

api.use('/api/v1', apiRoutes);

module.exports = api;
