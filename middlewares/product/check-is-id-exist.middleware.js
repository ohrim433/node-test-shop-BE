const products = require('../../db/products');

module.exports = (req, res, next) => {
    try {
        const {id} = req.params;
        const getProductIndex = products.findIndex(product => product.id === +id);

        if (getProductIndex < 0) {
            throw new Error(`id ${id} does not exist`);
        }

        next();
    } catch (e) {
        res.end(e.message);
    }
    
}
