const {Router} = require('express');


const userRouter = Router();


const {userController} = require('../../controllers')

const checkIsUserExists = require('../../middlewares/user/check-is-user-exists')
const checkIsUserValid = require('../../middlewares/user/check-is-user-valid')


userRouter.get('/', userController.getAllUsers);

userRouter.post('/auth', userController.loginUser)
userRouter.post('/', checkIsUserValid, userController.createUser);


userRouter.use('/:id', checkIsUserExists)
userRouter.get('/:id', userController.getUserByParams);
userRouter.delete('/:id', userController.deleteUser);






module.exports = userRouter;
