const {dbNames: {DB_USERS_TABLE}, modelNames: {USER}} = require('../../constants');

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
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            photo: {
                type: DataTypes.STRING
            }
        },
        {
            tableName: DB_USERS_TABLE,
            timestamps: false
        })

    return User;
}
