const {productService} = require('../../services');
const {ErrorHandler, error} = require('../../error/');
const {responseStatusCodesEnum} = require('../../constants')

module.exports = {

    getAllProducts: async (req, res) => {
        try {
            const products = await productService.getAllProducts();
            res.json(products);

        } catch (e) {
            res.json(e);
        }
    },

    getOneProduct: async (req, res, next) => {
        try {
            const {id} = req.params;
            const product = await productService.getOneProduct(+id);

            if (!product) {
                return next(new ErrorHandler(
                    error.NOT_FOUND.message,
                    responseStatusCodesEnum.NOT_FOUND,
                    error.NOT_FOUND.code
                ));
            }
            res.json(product);

        } catch (e) {
            next(e);
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const {id} = req.params;
            const product = await productService.getOneProduct(+id);

            if (!product) {
                return next(new ErrorHandler(
                    error.NOT_FOUND.message,
                    responseStatusCodesEnum.NOT_FOUND,
                    error.NOT_FOUND.code
                ));
            }
            productService.deleteProduct(+id);
            res.json();

        } catch (e) {
            next(e);

        }
    },

    createProduct: async (req, res) => {
        try {
            productService.createProduct(req.body);
            res.json();

        } catch (e) {
            res.json(e);
        }
    },

    updateProduct: async (req, res,next) => {
        try {
            const {id} = req.body;
            const product = await productService.getOneProduct(+id);

            if (!product) {
                return next(new ErrorHandler(
                    error.NOT_FOUND.message,
                    responseStatusCodesEnum.NOT_FOUND,
                    error.NOT_FOUND.code
                ));
            }
            productService.updateProduct(req.body);
            res.json();

        } catch (e) {
            next(e);
        }
    }
};
