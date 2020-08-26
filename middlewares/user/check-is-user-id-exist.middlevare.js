const Joi = require('joi');

const {responceStatusCodes} = require('../../constants');
const {ErrorHandler, errors: {NOT_FOUND, NOT_VALID_ID}} = require('../../errors');
const {userService} = require('../../services');
const {utilsValidators: {idValidationSchema}} = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const {userId} = req.params;
        const {error} = Joi.validate(userId, idValidationSchema);

        if (error) return next(new ErrorHandler(
            error.details[0].message,
            responceStatusCodes.BAD_REQUEST,
            NOT_VALID_ID.code
        ));

        const user = await userService.getUserByParams({id: userId});

        if (!user) return next(new ErrorHandler(
            NOT_FOUND.message,
            responceStatusCodes.NOT_FOUND,
            NOT_FOUND.code
        ));

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }

}
