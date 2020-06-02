const {productService} = require('../../services')

module.exports = async (req, res, next) => {
    try {
        const {productId} = req.params;

        if (isNaN(productId) || +productId < 0) return res.status(400).json({message: 'Incorrect id'});

        const product = await productService.getSingleProduct(productId);

        if (!product) res.sendStatus(404);

        req.product = product;

        next();
    } catch (e) {
        res.end(e.message);
    }

}
