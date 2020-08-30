const {modelNameEnum: {TOKEN},tableNameEnum:{TOKEN_TABLE}} = require('../../constants')

module.exports = (sequelize, DataTypes) => {

    const Token = sequelize.define(TOKEN, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            userId: {
                type: DataTypes.INTEGER,
                unique: true,
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

            createdAT: {
                type: DataTypes.DATE,
                defaultValue: sequelize.fn('now')
            }
        },

        {
            tableName: TOKEN_TABLE,
            timestamps: false
        })

    const User = sequelize.import("./User.js");

    Token.belongsTo(User, {foreignKey: 'userId'})

    return Token;
};
