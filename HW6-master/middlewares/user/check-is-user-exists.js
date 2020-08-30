const {userService} = require('../../services');
const {BAD_REQUEST, NOT_FOUND} = require('../../constants/responceStatusCodes.enum');
const {error,ErrorHandler} = require('../../error')

module.exports = async (req, res, next) => {

    try {
        const {id} = req.params;

        if (+id < 0) {
            return new ErrorHandler(
                BAD_REQUEST,
                error.NOT_FOUND.message
            );
        }

        const user = await userService.getOneUser(id);

        if (!user) {
            return new ErrorHandler(
                NOT_FOUND,
                error.NOT_FOUND.message
            );
        }

        req.user = user;

    } catch (e) {
        next(e);
    }

    
};






