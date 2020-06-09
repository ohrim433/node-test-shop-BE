const Joi = require('joi');

const {newUserValidationSchema} = require('../../validators');
const {ErrorHandler} = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const user = req.body;

        const {error} = Joi.validate(user, newUserValidationSchema);

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400))
        }

        next();
    } catch (e) {
        next(e);
    }
}
