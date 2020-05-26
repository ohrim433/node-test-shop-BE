const products = require('../../db/products');
const {productService} = require('../../services');

module.exports = {

    createProduct: (req, res) => {
        productService.createNewProduct(req.body, products);
        return res.end(`product has been added: ${JSON.stringify(req.body)} \n products list: ${JSON.stringify(products)}`);
    },

    getAllProducts: (req, res) => {
        const productsList = productService.getAllProducts(products);

        res.end(`${JSON.stringify(productsList)}`);
    },

    getSingleProduct: (req, res) => {
        const {id} = req.params;
        const product = productService.getSingleProduct(products, +id);

        res.end(`${JSON.stringify(product)}`);
    },

    updateProduct: (req, res) => {
        const {id} = +req.params;
        const product = productService.updateProduct(products, id, req.body);

        res.end(`updated product - ${JSON.stringify(product)} \n current products list: ${JSON.stringify(products)}`);
    },

    deleteProduct: (req, res) => {
        const {id} = req.params;
        const updatedProducts = productService.deleteProduct(products, +id);

        res.end(`updated list: ${JSON.stringify(updatedProducts)}`);
    }
}
