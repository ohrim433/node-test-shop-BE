const {Router} = require('express');

const {userController} = require('../../controllers');
const {checkIsProductIdExist, checkIsProductDataValid} = require('../../middlewares');

const userRouter = Router();

// get all users
userRouter.get('/', userController.getAllUsers);

// create new user
userRouter.post('/',
    // checkIsUserDataValid,
    userController.createUser);

// use checkIsIdExist middleware
// userRouter.use('/:userId', checkIsProductIdExist);

// get single product
userRouter.get('/:userId', userController.getSingleUser);

// delete product
userRouter.delete('/:userId', userController.deleteUser);

// update product
userRouter.put('/:userId',
    // checkIsProductDataValid,
    userController.updateUser);

module.exports = userRouter;
