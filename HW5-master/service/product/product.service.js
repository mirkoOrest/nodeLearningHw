const db = require('../../dataBase').getInstance();
const {modelNameEnum: {PRODUCT}} = require('../../constans/')

module.exports = {
    getAllProducts: () => {
        const ProductModel = db.getModel(PRODUCT);

        return ProductModel.findAll({})

    },

    getOneProduct: (id) => {
        const ProductModel = db.getModel(PRODUCT);
        return ProductModel.findByPk(id)


    },

    deleteProduct: (id) => {
        const ProductModel = db.getModel(PRODUCT);
        ProductModel.destroy({
            where: {
                id
            }
        })

    },


    createProduct: (product) => {
        const ProductModel = db.getModel(PRODUCT);
        ProductModel.create(product)
    },

    updateProduct: (product) => {
        const {id,name,price} = product
        const ProductModel = db.getModel(PRODUCT);
        ProductModel.update({name, price}, {
            where: {
                id
            }
        })
    }


};

