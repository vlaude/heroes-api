const bcrypt = require('bcrypt'); // https://github.com/kelektiv/node.bcrypt.js

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        'Users',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    isEmail: true
                }
            },
            hash: {
                type: DataTypes.STRING,
                allowNull: false,
                set(val) {
                    const hash = bcrypt.hashSync(val, 12);
                    this.setDataValue('hash', hash);
                }
            }
        },
        {
            paranoid: true,
            indexes: [
                {
                    unique: true,
                    fields: ['username', 'email']
                }
            ]
        }
    );

    // we don't want to send password even if crypted
    Users.excludeAttributes = ['hash'];

    Users.prototype.comparePassword = (password) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, this.hash, (err, res) => {
                if (err || !res) {
                    return reject(new Error('INVALID CREDENTIALS'));
                }
                return resolve();
            });
        });
    };

    return Users;
};
