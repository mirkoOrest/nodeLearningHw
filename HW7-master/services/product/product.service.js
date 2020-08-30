const db = require('../../database').getInstance();

const {modelNameEnum: {PRODUCT}} = require('../../constants/');


module.exports = {


    getAllProducts: () => {
        const UserModel = db.getModel(PRODUCT);
        return UserModel.findAll({});

    },


    getOneProduct: (id) => {
        const ProductModel = db.getModel(PRODUCT);
        return ProductModel.findByPk(id);


    },


    deleteProduct: (id) => {
        const ProductModel = db.getModel(PRODUCT);
        ProductModel.destroy({
            where: {
                id
            }
        });

    },


    createProduct: (req) => {
        const {name, price} = req;
        const ProductModel = db.getModel(PRODUCT);
        ProductModel.create({name, price});
    },


    updateProduct: (req) => {
        const {id, name, price} = req
        const ProductModel = db.getModel(PRODUCT);
        ProductModel.update({name, price}, {
            where: {
                id
            }
        });
    }


};
