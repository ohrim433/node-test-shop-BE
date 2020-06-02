const {productService} = require('../../services');
const {ErrorHandler} = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const {productId} = req.params;

        if (isNaN(productId) || +productId < 0) return next(new ErrorHandler('Incorrect id', 400, 4001));

        const product = await productService.getSingleProduct(productId);

        if (!product) return next(new ErrorHandler('Not found', 404, 4041));

        req.product = product;

        next();
    } catch (e) {
        next(e.message);
    }

}
