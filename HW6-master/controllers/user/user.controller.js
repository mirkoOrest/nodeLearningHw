const {userService} = require('../../services');
const {hashPassword, checkHashPassword} = require('../../helpers');
const {ErrorHandler, error} = require('../../error/');
const {responseStatusCodesEnum} = require('../../constants')


module.exports = {

    getAllUsers: async (req, res, next) => {

        try {
            const users = await userService.getAllUsers();
            res.json(users);

        } catch (e) {
            next(new ErrorHandler(e.message));
        }
    },

    getUserByParams: async (req, res, next) => {

        try {
            const {id} = req.params;
            const user = await userService.getOneUser(id);

            if (!user) {
                return next(new ErrorHandler(
                    error.NOT_FOUND.message,
                    responseStatusCodesEnum.NOT_FOUND,
                    error.NOT_FOUND.code
                ));
            }

            res.json(user);

        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const {id} = req.params;


            const user = await userService.getOneUser(id);

            if (!user) {
                return next(new ErrorHandler(
                    error.NOT_FOUND.message,
                    responseStatusCodesEnum.NOT_FOUND,
                    error.NOT_FOUND.code
                ));
            }

            await userService.deleteUser(+id);


            res.end()

        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const user = req.body;
            user.password = await hashPassword(user.password);
            await userService.createUser(user);

            res.end();

        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {email} = req.body;
            const user = await userService.getOneUser({email});

            if (!user) {
                return next(new ErrorHandler(
                    error.NOT_FOUND.message,
                    responseStatusCodesEnum.NOT_FOUND,
                    error.NOT_FOUND.code
                ));
            }

            await userService.updateUser(req.body);
            res.json();

        } catch (e) {
            next(e);
        }
    },

    loginUser: async (req, res, next) => {

        try {
            const {email, password} = req.body;

            const user = await userService.getOneUser({email});

            if (!user) {
                return next(new ErrorHandler(
                    error.NOT_FOUND.message,
                    responseStatusCodesEnum.NOT_FOUND,
                    error.NOT_FOUND.code
                ));
            }

            await checkHashPassword(user.password, password);

            res.json(user);

        } catch (e) {
            next(e);
        }
    }
};
