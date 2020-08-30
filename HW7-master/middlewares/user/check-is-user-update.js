const Joi = require('joi');

const userUpdateValidationSchema = require('../../validators/user/update-user.validator');
const {ErrorHandler} = require('../../error/');
const {BAD_REQUEST} = require('../../constants/responceStatusCodes.enum');


module.exports = (req, res, next) => {
    try {
        const user = req.body;

        const {error} = Joi.validate(user, userUpdateValidationSchema);

        if (error) {
            return next(new ErrorHandler(
                error.details[0].message,
                BAD_REQUEST
            ));
        }

        next();
    } catch (e) {
       next(e);

    }
};
