const Joi = require('joi');

const userValidationSchema = require('../../validators/user/user.validator');
const ErrorHandler = require('../../error/ErrorHandler');

module.exports = async (req, res, next) => {

    try {
        const user = req.body


        const {error} = Joi.validate(user, userValidationSchema)

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400))
        }


        next();

    } catch (e) {
        res.render('error', {message: e.message})
    }


}
