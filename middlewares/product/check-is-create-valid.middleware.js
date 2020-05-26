const products = require('../../db/products');

module.exports = (req, res, next) => {
    try {
        const {id, title, type, price} = req.body;
        const isExist = products.find(product => product.id === +id)

        if (isExist) {
            throw new Error(`id ${id} is already exist`);
        }

        if (!id || id < 0 || !title || !type || !price || price < 1) {
            throw new Error('data is not valid');
        }

        next();
    } catch (e) {
        res.end(e.message);
    }
}
