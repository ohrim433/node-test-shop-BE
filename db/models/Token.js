const {dbNames: {TOKENS_TABLE}, modelNames: {TOKEN}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const Token = sequelize.define(TOKEN, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            access_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: sequelize.fn('now')
            }
        },
        {
            tableName: TOKENS_TABLE,
            timestamps: false
        })

    // foreign key: tokens.userId <=> users.id (not necessary, I did it in SQL)
    // const User = sequelize.import('./User.js');

    // Token.belongsTo(User, {foreignKey: 'userId'});

    return Token;
}
