const {Router} = require('express');


const userRouter = Router();


const {userController} = require('../../controllers');


const {userMiddleware} = require('../../middlewares');


userRouter.get('/', userController.getAllUsers);


userRouter.post('/auth', userController.loginUser);


userRouter.use('/:id', userMiddleware.checkIsUserExist);
userRouter.get('/:id', userController.getUserByParams);
userRouter.delete('/:id', userController.deleteUser);


userRouter.post('/', userMiddleware.checkIsUserValid, userController.createUser);
userRouter.put('/', userMiddleware.checkIsUserUpdate, userController.updateUser);


module.exports = userRouter;
