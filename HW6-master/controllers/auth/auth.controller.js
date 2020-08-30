const {authService, userService} = require('../../services');
const {tokenGenerate, checkHashPassword} = require('../../helpers');
const {ErrorHandler, error} = require('../../error/');
const {requestHeadersEnum: {AUTHORIZATION}, responseStatusCodesEnum} = require('../../constants');

module.exports = {

    loginUser: async (req, res, next) => {

        try {
            const {email, password} = req.body;
            const user = await userService.getOneUser({email});

            if (!user) {
                return next(new ErrorHandler(
                    error.NOT_FOUND.message,
                    responseStatusCodesEnum.NOT_FOUND,
                    error.NOT_FOUND.code
                ))
            }

            await checkHashPassword(user.password, password)

            const tokens = tokenGenerate();

            await authService.createTokenPair({...tokens, userId: user.id});

            res.json(tokens);

        } catch (e) {
            next(e)
        }
    },

    logoutUser: async (req, res) => {

        const access_token = req.get(AUTHORIZATION);

        await authService.deleteByParams({access_token});

        res.sendStatus(200);
    },

    refreshToken: async (req, res, next) => {

        try {
            const refresh_token = req.get(AUTHORIZATION);

            const userId = req.userId;

            const user = await userService.getUserById(userId);

            if (!user) {
                return next(
                    new ErrorHandler(
                        error.NOT_FOUND.message,
                        responseStatusCodesEnum.NOT_FOUND,
                        error.NOT_FOUND.code
                    )
                )
            }

            const tokens = tokenGenerate();

            await authService.deleteByParams({refresh_token});
            await authService.createTokenPair(tokens);

            res.json(tokens);

        } catch (e) {
            next(e)
        }
    }
};
