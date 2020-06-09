const Joi = require('joi');

const {newProductValidationSchema} = require('../../validators');
const {ErrorHandler} = require('../../errors');

module.exports = (req, res, next) => {
    try {
        const product = req.body;

        const {error} = Joi.validate(product, newProductValidationSchema);

        if (error) {
            return next(new ErrorHandler(error.details[0].message, 400))
        }

        next();
    } catch (e) {
        next(e);
    }
}
