const {dbNames: {PRODUCTS_TABLE}, modelNames: {PRODUCT}} = require('../../constants');

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
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            tableName: PRODUCTS_TABLE,
            timestamps: false
        })

    return Product;
}
