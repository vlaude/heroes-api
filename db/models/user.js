module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
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
