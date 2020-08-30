const {modelNameEnum:{USER},tableNameEnum:{USERS_TABLE}} = require('../../constants')

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define(USER, {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },

        {
            tableName: USERS_TABLE,
            timestamps: false
        })

    return User;
};
