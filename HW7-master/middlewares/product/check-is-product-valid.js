const Joi = require('joi');

const productValidationSchema = require('../../validators/product/product.validator');
const {ErrorHandler} = require('../../error/');
const {BAD_REQUEST} = require('../../constants/responceStatusCodes.enum')

module.exports = async (req, res, next) => {


    try {
        const product = req.body

        const {error} = Joi.validate(product, productValidationSchema)

        if (error) {
            return next(new ErrorHandler(
                error.details[0].message,
                BAD_REQUEST
            ))
        }

        next();

    } catch (e) {
        next(e);
    }


};
