const db = require('../../db').getInstance();

class ProductService {

    getProducts() {
        const ProductModel = db.getModel('Product');
        return ProductModel.findAll({});
    }

    async createProduct(product) {
        const ProductModel = await db.getModel('Product');
        ProductModel.create(product);
    }

    async getSingleProduct(productId) {
        const ProductModel = await db.getModel('Product');
        return ProductModel.findByPk(productId);
    }

    async deleteProduct(id) {
        const ProductModel = await db.getModel('Product');
        return ProductModel.destroy({where: {id}});
    }

    async updateProduct(id, newProduct) {
        const ProductModel = await db.getModel('Product');
        return ProductModel.update(newProduct, {where: {id}});
    }
}

module.exports = new ProductService;
