const express = require('express');

const config = require('../config');
const roomController = require('../controllers/room.controller');
const { allowOnly } = require('../middlewares/auth.middleware');

const apiRoom = express.Router();
const apiRoomProtected = express.Router();

apiRoomProtected.get('/', roomController.getAllJoinedRooms);
apiRoomProtected.post('/', roomController.createRoom);
apiRoomProtected.get('/public', roomController.getAllRooms);
apiRoomProtected.post('/public', allowOnly(config.accessLevels.ADMIN, roomController.createPublicRoom));

module.exports = { apiRoom, apiRoomProtected };
