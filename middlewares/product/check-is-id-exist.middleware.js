const {productService} = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const {id} = req.params;
        const products = await productService.getProducts();
        const getProductIndex = await products.findIndex(product => product.id === +id);

        if (getProductIndex < 0) {
            throw new Error(`id ${id} does not exist`);
        }

        next();
    } catch (e) {
        res.end(e.message);
    }

}
