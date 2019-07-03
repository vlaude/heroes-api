const bcrypt = require('bcrypt');

const config = require('../../config');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        role: {
            type: DataTypes.INTEGER,
            defaultValue: config.userRoles.USER,
            allowNull: false,
        },
        hash: {
            type: DataTypes.STRING,
            allowNull: false,
            set(val) {
                const hash = bcrypt.hashSync(val, 12);
                this.setDataValue('hash', hash);
            },
        },
    });
    User.associate = models => {
        // associations can be defined here
    };

    // we don't want to send password even if crypted
    User.excludeAttributes = ['hash', 'createdAt', 'updatedAt'];

    return User;
};
