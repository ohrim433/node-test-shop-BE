const {dbNames: {DB_PRODUCTS_TABLE}, modelNames: {PRODUCT}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(PRODUCT, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false
            },
            price: {
                type: DataTypes.DOUBLE,
                allowNull: false
            }
        },
        {
            tableName: DB_PRODUCTS_TABLE,
            timestamps: false
        })

    return Product;
}
