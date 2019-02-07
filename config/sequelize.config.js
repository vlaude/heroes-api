const Sequelize = require('sequelize');
const db = {};

const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });

const User = sequelize.import('../db/models/user');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
