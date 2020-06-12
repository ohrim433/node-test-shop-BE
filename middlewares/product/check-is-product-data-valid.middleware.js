const Joi = require('joi');

const {responceStatusCodes} = require('../../constants')
const {ErrorHandler} = require('../../errors');
const {newProductValidationSchema} = require('../../validators');

module.exports = (req, res, next) => {
    try {
        const product = req.body;
        const {error} = Joi.validate(product, newProductValidationSchema);

        if (error) {
            return next(new ErrorHandler(error.details[0].message, responceStatusCodes.BAD_REQUEST));
        }

        next();
    } catch (e) {
        next(e);
    }
};
