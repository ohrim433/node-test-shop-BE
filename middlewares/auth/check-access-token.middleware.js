const jwt = require('jsonwebtoken');

const {
    requestHeaders: {AUTHORIZATION},
    responceStatusCodes,
    tokenWords: {JWT_SECRET}
} = require('../../constants');
const {
    ErrorHandler,
    errors: {NOT_VALID_TOKEN, NO_TOKEN}
} = require('../../errors');
const {authService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const token = req.get(AUTHORIZATION);

        if (!token) {
            return next(new ErrorHandler(
                NO_TOKEN.message,
                responceStatusCodes.BAD_REQUEST,
                NO_TOKEN.code
            ));
        }

        jwt.verify(token, JWT_SECRET, err => {
            if (err) {
                throw new ErrorHandler(
                    NOT_VALID_TOKEN.message,
                    responceStatusCodes.UNAUTHORIZED,
                    NOT_VALID_TOKEN.code
                );
            }
        });

        const tokensFromDB = await authService.getTokensByParams({access_token: token});

        if (!tokensFromDB) {
            return next(new ErrorHandler(
                NOT_VALID_TOKEN.message,
                responceStatusCodes.UNAUTHORIZED,
                NOT_VALID_TOKEN.code
            ))
        }

        req.user_id = tokensFromDB.userId;

        next();
    } catch (e) {
        next(e);
    }

}
