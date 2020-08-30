const Joi = require('joi');

const productValidationSchema = require('../../validators/product/product.validator');
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = async (req, res, next) => {

    try {
        const product = req.body


        const {error} = Joi.validate(product, productValidationSchema)

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400))
        }


        next();

    } catch (e) {
        res.render('error', {message: e.message})
    }


}
