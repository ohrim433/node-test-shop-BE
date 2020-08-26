const Joi = require('joi');

const {responceStatusCodes} = require('../../constants');
const {ErrorHandler} = require('../../errors');
const {newUserValidationSchema} = require('../../validators');

module.exports = (req, res, next) => {
    try {
        const user = req.body;
        const {error} = Joi.validate(user, newUserValidationSchema);

        if (error) {
            return next(new ErrorHandler(error.details[0].message, responceStatusCodes.NOT_FOUND));
        }

        next();
    } catch (e) {
        next(e);
    }
}
