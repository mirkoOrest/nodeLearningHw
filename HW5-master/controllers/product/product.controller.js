const {productService} = require('../../service')
const ErrorHandler = require('../../error/ErrorHandler');



module.exports = {

    getAllProducts: async (req,res) => {
        try {
            const products = await productService.getAllProducts()
            res.json(products)
        } catch (e) {
            res.json(e)

        }

    },

    getOneProduct: async (req, res, next) => {
        try {
            // const {id} = req.params;
            // const product = await productService.getOneProduct(id)
            // res.json(product)
            const product = req.product;

            if (!product) {
                return next(new ErrorHandler('Wrong id of product', 404, 4042));
            }
            res.json(product)
        } catch (e) {
            next(e)
        }


    },

    deleteProduct: async (req, res, next) => {
        try {
            const {id} = req.params;
            const product = await productService.getOneProduct(id)

            if (!product) {
                return next(new ErrorHandler('Wrong id of product', 404, 4042));
            }
            productService.deleteProduct(+id)

            res.sendStatus(204);
        } catch (e) {
            next(e)
        }


    },

    createProduct: async (req,res) => {
        try {
            productService.createProduct(req.body)

            res.json()
        } catch (e) {
            res.json(e)

        }
    },

    updateProduct: async (req,res) => {
        try {
            productService.updateProduct(req.body)

            res.json()
        } catch (e) {
            res.json(e)

        }
    }
};
