const db = require('../../db').getInstance();

const {modelNames: {PRODUCT}} = require('../../constants');

class ProductService {

    getProducts() {
        const ProductModel = db.getModel(PRODUCT);
        return ProductModel.findAll({});
    }

    async createProduct(product) {
        const ProductModel = await db.getModel(PRODUCT);
        ProductModel.create(product);
    }

    async getSingleProduct(id) {
        const ProductModel = await db.getModel(PRODUCT);
        return ProductModel.findByPk(id);
    }

    async deleteProduct(id) {
        const ProductModel = await db.getModel(PRODUCT);
        return ProductModel.destroy({where: {id}});
    }

    async updateProduct(id, newProduct) {
        const ProductModel = await db.getModel(PRODUCT);
        return ProductModel.update(newProduct, {where: {id}});
    }
}

module.exports = new ProductService;
