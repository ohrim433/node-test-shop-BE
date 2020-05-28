const {productService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;
        const product = await productService.getSingleProduct(id);

        if (!product) {
            throw new Error(`id ${id} does not exist`);
        }

        next();
    } catch (e) {
        res.end(e.message);
    }

}
