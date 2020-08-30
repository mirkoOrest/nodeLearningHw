const db = require('../../database').getInstance();

const {modelNameEnum: {USER}} = require('../../constants/');


module.exports = {


    getAllUsers: () => {
        let UserModel = db.getModel(USER);
        return UserModel.findAll({});
    },


    getOneUser: (params) => {
        const UserModel = db.getModel(USER);
        return UserModel.findOne({where: params});
    },


    getUserById: (id) => {
        const UserModel = db.getModel(USER);
        return UserModel.findByPk(id);
    },


    deleteUser: (id) => {
        const UserModel = db.getModel(USER);
        UserModel.destroy({
            where: {
                id
            }
        });
    },


    createUser: (user) => {
        const {name, email, password} = user;
        const UserModel = db.getModel(USER);
        UserModel.create({name, email, password});
    },


    updateUser: (req) => {
        const {id, name, password} = req
        const UserModel = db.getModel(USER);
        UserModel.update({id, name, password}, {
            where: {
                id
            }
        });
    }


};
