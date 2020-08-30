const {userService} = require('../../service')
const {hashPassword, checkHashPassword} = require('../../helpers');
const ErrorHandler = require('../../error/ErrorHandler')

module.exports = {


    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers()
            res.json(users)
        } catch (e) {
            res.json(e)
        }
    },


    getUserByParams: async (req, res, next) => {
        try {
            // const {id} = req.params;
            // const user = await userService.getUserByParams(id)
            // // res.json(user)
            const user = req.user;
            if (!user) {
                return next(new ErrorHandler('Wrong id', 404, 4043));
            }
            res.json(user)
        } catch (e) {
            next(e)
        }


    },
    //
    deleteUser: async (req, res, next) => {
        try {
            const {id} = req.params;
            const user = await userService.getUserByParams(id)

            if (!user) {
                return next(new ErrorHandler('Wrong id of user', 404, 4042));
            }

            userService.deleteUser(+id)

            res.sendStatus(204);
        } catch (e) {
            res.json(e)
        }


    },

    createUser: async (req, res) => {
        try {
            const user = req.body;
            const hashedPassword = await hashPassword(user.password)

            user.password = hashedPassword;

            await userService.createUser(user);
        } catch (e) {
            res.json(e)
        }

        res.end()
    },

    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;

            const user = await userService.getUserByParams({email});

            if (!user) {
                return next(new ErrorHandler('Wrong email or password', 404, 4041));
            }

            await checkHashPassword(user.password, password);

            res.json(user);
        } catch (e) {
            next(e)
        }


    }
};
