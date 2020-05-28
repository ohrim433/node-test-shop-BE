const {productService} = require('../../services');

module.exports = {

    getAllProducts: async (req, res) => {
        let productsList = await productService.getProducts();

        res.json(productsList);
    },

    createProduct: async (req, res) => {
        try {
            await productService.createProduct(req.body);
        } catch (e) {
            res.json(e.message);
        }

        res.end();
    },

    getSingleProduct: async (req, res) => {
        const {id} = req.params;
        try {
            const product = await productService.getSingleProduct(id);

            res.end(`${JSON.stringify(product)}`);
        } catch (e) {
            res.json(e.message);
        }
    },

    deleteProduct: async (req, res) => {
        const {id} = req.params;
        try {
            await productService.deleteProduct(id);
        } catch (e) {
            res.json(e.message);
        }

        res.end();
    },

    updateProduct: async (req, res) => {
        const {id} = req.params;
        try {
            await productService.updateProduct(id, req.body);

            res.end();
        } catch (e) {
            res.json(e.message);
        }
    }
}
