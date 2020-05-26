const products = require('../../db/products');

module.exports = (req, res, next) => {
    try {
        const {id, title, type, price} = req.body;
        const productId = +req.params.id;

        if (productId !== id) {
            const getProductIndex = products.findIndex(product => product.id === id);
            if (getProductIndex > -1) {
                throw new Error(`id ${id} is already exist`);
            }
        }

        if (!id || +id < 0 || !title || !type || !price || price < 1) {
            throw new Error('new data is not valid');
        }

        next();
    } catch (e) {
        res.end(e.message);
    }
}
