const Joi = require('joi');

const {responceStatusCodes} = require('../../constants');
const {ErrorHandler, errors: {NOT_FOUND, NOT_VALID_ID}} = require('../../errors');
const {productService} = require('../../services');
const {idValidationSchema} = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const {productId} = req.params;
        const {error} = Joi.validate(productId, idValidationSchema);

        if (error) return next(new ErrorHandler(
            error.details[0].message,
            responceStatusCodes.BAD_REQUEST,
            NOT_VALID_ID.code
        ));

        const product = await productService.getProductById(productId);

        if (!product) return next(new ErrorHandler(
            NOT_FOUND.message,
            responceStatusCodes.NOT_FOUND,
            NOT_FOUND.code
        ));

        req.product = product;

        next();
    } catch (e) {
        next(e);
    }

}
