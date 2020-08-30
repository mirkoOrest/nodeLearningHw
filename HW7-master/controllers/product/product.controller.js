const {emailService, productService, userService} = require('../../services');
const {error, ErrorHandler} = require('../../error/');
const {emailActionEnum} = require('../../constants');
const {responseStatusCodesEnum} = require('../../constants');


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
            const user = await userService.getOneUser(id);

            if (!product) {
                return next(new ErrorHandler(
                    error.NOT_FOUND.message,
                    responseStatusCodesEnum.NOT_FOUND,
                    error.NOT_FOUND.code
                ));
            }
            await productService.deleteProduct(+id);

            await emailService.sendMail(
                user.email,
                emailActionEnum.PRODUCT_DELETE,
                {
                    productName: product.name,
                    userName: user.name
                }).catch(() => {
            })

            res.json();

        } catch (e) {
            next(e);

        }
    },

    createProduct: async (req, res) => {
        try {
            const id = req.id
            const user = await userService.getOneUser(id);
            const product = await productService.createProduct(req.body);

            await emailService.sendMail(
                user.email,
                emailActionEnum.PRODUCT_CREATE,
                {
                    productName: product.name,
                    userName: user.name
                }).catch(() => {
            })

            res.json();

        } catch (e) {
            res.json(e);
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const {id} = req.body;
            const idOfUser = req.id;
            const product = await productService.getOneProduct(+id);
            const user = await userService.getOneUser(idOfUser);

            if (!product) {
                return next(new ErrorHandler(
                    error.NOT_FOUND.message,
                    responseStatusCodesEnum.NOT_FOUND,
                    error.NOT_FOUND.code
                ));
            }
            await productService.updateProduct(req.body);

            await emailService.sendMail(
                user.email,
                emailActionEnum.PRODUCT_UPDATE,
                {
                    productName: product.name,
                    userName: user.name
                }).catch(() => {
            })

            res.json();

        } catch (e) {
            next(e);
        }
    }
};
