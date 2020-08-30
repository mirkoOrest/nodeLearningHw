const db = require('../../dataBase').getInstance();
const {modelNameEnum: {USER}} = require('../../constans/')

module.exports = {

    getAllUsers: () => {
        let UserModel = db.getModel(USER);

        return UserModel.findAll({})
    },


    getUserByParams: (params) => {
        const UserModel = db.getModel(USER);

        return UserModel.findOne({
            where: params
        })
    },

    deleteUser: (id) => {
        const UserModel = db.getModel(USER);
        UserModel.destroy({
            where: {
                id
            }
        })

    },


    createUser: (user) => {
        const UserModel = db.getModel(USER);
        UserModel.create(user)
    },

};

