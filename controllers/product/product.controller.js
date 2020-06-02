const {productService} = require('../../services');
const {ErrorHandler} = require('../../errors');

module.exports = {

    getAllProducts: async (req, res) => {
        let products = await productService.getProducts();

        res.json(products);
    },

    createProduct: async (req, res, next) => {
        try {
            const product = req.body;

            await productService.createProduct(product);

            res.sendStatus(201);  // The HTTP 201 Created success status response code
        } catch (e) {
            next(e.message);
        }
    },

    getSingleProduct: async (req, res) => {
        res.json(req.product);
    },

    deleteProduct: async (req, res, next) => {
        const {productId} = req.params;
        try {
            await productService.deleteProduct({id: productId});

            res.sendStatus(204);
        } catch (e) {
            next(e.message);
        }

        res.end();
    },

    updateProduct: async (req, res, next) => {
        const {id} = req.params;
        const product = req.body;
        try {
            const [isSuccess] = await productService.updateProduct(id, product);

            // The HTTP 200 OK success status response code indicates that the request has succeeded
            isSuccess ? res.sendStatus(200) : res.json({updated: false});
        } catch (e) {
            next(e.message);
        }
    }
}
