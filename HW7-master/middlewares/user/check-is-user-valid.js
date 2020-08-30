const Joi = require('joi');

const userValidatorSchema = require('../../validators/user/user.validator');
const {ErrorHandler} = require('../../error');
const {BAD_REQUEST} = require('../../constants/responceStatusCodes.enum');


module.exports = (req, res, next) => {
    try {
        const user = req.body;

        const {error} = Joi.validate(user, userValidatorSchema);

        if (error) {
            return next(new ErrorHandler(
                error.details[0].message,
                BAD_REQUEST
            ));
        }

        next();
    } catch (e) {
        res.render('error', {message: e.message});

    }
};
