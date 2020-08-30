const db = require('../../dataBase').getInstance();

module.exports = {
    getAllProducts: () => {
        const UserModel = db.getModel('Product');

        return UserModel.findAll({})

    },

    getOneProduct: (id) => {
        const ProductModel = db.getModel('Product');
        return ProductModel.findByPk(id)


    },

    deleteProduct: (id) => {
        const ProductModel = db.getModel('Product');
        ProductModel.destroy({
            where: {
                id
            }
        })

    },


    createProduct: (req) => {
        const {name,price} = req;
        const ProductModel = db.getModel('Product');
        ProductModel.create({name, price})
    },

    updateProduct: (req) => {
        const {id,name,price} = req
        const ProductModel = db.getModel('Product');
        ProductModel.update({name, price}, {
            where: {
                id
            }
        })
    }


};

