const {productService} = require('../../services');
const {BAD_REQUEST} = require('../../constants/responceStatusCodes.enum');
const {NOT_FOUND} = require('../../constants/responceStatusCodes.enum');
const {error,ErrorHandler} = require('../../error')

module.exports = async (req, res, next) => {


    try {
        const {id} = req.params;

        if (+id < 0) {
            return new ErrorHandler(
                NOT_FOUND.message,
                BAD_REQUEST
            );
        }

        const product = await productService.getOneProduct(id);

        if (!product) {
            return new ErrorHandler(
                error.NOT_FOUND.message,
                NOT_FOUND,
                error.NOT_FOUND.code
            )
        }

        req.product = product;

    } catch (e) {
        next(e)
    }

    next();
};


