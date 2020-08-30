const {modelNameEnum:{PRODUCT},tableNameEnum:{PRODUCTS_TABLE}} = require('../../constants');

module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define(PRODUCT, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            price: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },

        {
            tableName: PRODUCTS_TABLE,
            timestamps: false
        })

    return Product;
};
