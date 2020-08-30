const jwt = require('jsonwebtoken');

const {
    tokensWordsEnum: {JWT_SECRET},
    responseStatusCodesEnum,
    requestHeadersEnum: {AUTHORIZATION}
} = require('../../constants');
const {authService} = require('../../services');
const {ErrorHandler, error} = require('../../error');


module.exports = async (req, res, next) => {


    try {
        const token = req.get(AUTHORIZATION);


        if (!token) {
            return next(new ErrorHandler(
                error.NOT_VALID_TOKEN.message,
                responseStatusCodesEnum.BAD_REQUEST,
                error.NOT_VALID_TOKEN.code
            ));

        }


        jwt.verify(token, JWT_SECRET, err => {
            if (err) {
                return next(new ErrorHandler(
                    error.NOT_VALID_TOKEN.message,
                    responseStatusCodesEnum.UNAUTHORIZED,
                    error.NOT_VALID_TOKEN.code
                ))
            }
        })


        const tokenFromDB = await authService.getTokenByParams({access_token: token});


        if (!tokenFromDB) {
            return next(new ErrorHandler(
                error.NOT_VALID_TOKEN.message,
                responseStatusCodesEnum.UNAUTHORIZED,
                error.NOT_VALID_TOKEN.code
            ))
        }


        req.userid = tokenFromDB.userId
        next()

    } catch (e) {
        next(e)
    }
};
