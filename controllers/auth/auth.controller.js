const {
    requestHeaders: {AUTHORIZATION},
    responceStatusCodes
} = require('../../constants');
const {ErrorHandler, errors} = require('../../errors');
const {checkHashedPasswords, tokenGenerator} = require('../../helpers');
const {authService, userService} = require('../../services');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await userService.getUserByParams({email});

            if (!user) {
                return next(new ErrorHandler(
                    errors.NOT_FOUND.message,
                    responceStatusCodes.NOT_FOUND,
                    errors.NOT_FOUND.code
                ));
            }

            await checkHashedPasswords(user.password, password);

            const tokens = tokenGenerator();

            await authService.createTokenPair({...tokens, userId: user.id});

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            await authService.deleteTokensByParams({access_token});

            res.sendStatus(responceStatusCodes.OK);
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);
            const userId = req.userId;
            const user = await userService.getUserById(userId);

            if (!user) {
                return next(new ErrorHandler(
                    errors.NOT_FOUND.message,
                    responceStatusCodes.NOT_FOUND,
                    errors.NOT_FOUND.code
                ))
            }

            const tokens = await tokenGenerator();

            await authService.deleteTokensByParams({refresh_token});
            await authService.createTokenPair(tokens);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
}
