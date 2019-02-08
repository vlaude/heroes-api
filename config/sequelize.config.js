const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });

sequelize.import('../db/models/user');
sequelize.import('../db/models/messages');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
