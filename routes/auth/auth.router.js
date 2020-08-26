const {Router} = require('express');

const {authController} = require('../../controllers');
const {checkAccessToken, checkRefreshToken} = require('../../middlewares')

const authRouter = Router();

// create new tokens pair
authRouter.post('/', authController.loginUser);

// delete tokens pair
authRouter.post('/logout', checkAccessToken, authController.logoutUser);

// refresh tokens pair
authRouter.post('/refresh', checkRefreshToken, authController.refreshToken);

module.exports = authRouter;
