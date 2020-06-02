const {dbNames: {USERSTABLE}, modelNames: {USER}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(USER, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: USERSTABLE,
            timestamps: false
        })

    return User;
}
