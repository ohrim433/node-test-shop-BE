const {Router} = require('express');

const {userController} = require('../../controllers');
const {
    checkIsUserDataValid,
    checkIsUserIdExist,
    filesMiddleware: {checkIsAvatarValid}
} = require('../../middlewares');

const userRouter = Router();

// get all users
userRouter.get('/', userController.getAllUsers);

// create new user
userRouter.post('/', checkIsUserDataValid, checkIsAvatarValid, userController.createUser);

// use checkIsIdExist middleware
userRouter.use('/:userId', checkIsUserIdExist);

// get single user
userRouter.get('/:userId', userController.getSingleUser);

// delete user
userRouter.delete('/:userId', userController.deleteUser);

// update user
userRouter.put('/:userId', checkIsUserDataValid, checkIsAvatarValid, userController.updateUser);

module.exports = userRouter;
