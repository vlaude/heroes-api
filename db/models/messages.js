module.exports = (sequelize, DataTypes) => {
    const Messages = sequelize.define('Messages', {
        timeStamp: DataTypes.DATE,
        message: DataTypes.STRING
    }, {
        paranoid: true
    });

    Messages.sync({ force: true });

    return Messages;
};
