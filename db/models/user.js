module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        username: DataTypes.STRING
    }, {
        paranoid: true
    });

    User.sync({ force: true }).then(() => {
        return User.create({
            username: 'admin'
        });
    });

    return User;
};
