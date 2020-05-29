const {productService} = require('../../services');

module.exports = {

    getAllProducts: async (req, res) => {
        let productsList = await productService.getProducts();

        res.json(productsList);
    },

    createProduct: async (req, res) => {
        try {
            await productService.createProduct(req.body);

            res.sendStatus(201);  // The HTTP 201 Created success status response code
        } catch (e) {
            res.json(e.message);
        }
    },

    getSingleProduct: async (req, res) => {
        const {id} = req.params;
        try {
            const product = await productService.getSingleProduct(id);

            res.json(product);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteProduct: async (req, res) => {
        const {id} = req.params;
        try {
            const isSuccess = await productService.deleteProduct(id);

            // The HTTP 204 No Content success status response code
            isSuccess ? res.sendStatus(204) : res.json({deleted: true});
        } catch (e) {
            res.json(e.message);
        }

        res.end();
    },

    updateProduct: async (req, res) => {
        const {id} = req.params;
        const product = req.body;
        try {
            const [isSuccess] = await productService.updateProduct(id, product);

            // The HTTP 200 OK success status response code indicates that the request has succeeded
            isSuccess ? res.sendStatus(200) : res.json({updated: false});
        } catch (e) {
            res.json(e.message);
        }
    }
}
