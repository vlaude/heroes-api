module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('message', {
        timeStamp: DataTypes.DATE,
        message: DataTypes.STRING
    }, {
        paranoid: true
    });

    Message.sync({ force: true });

    return Message;
};
