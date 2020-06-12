const db = require('../../db').getInstance();

const {modelNames: {PRODUCT}} = require('../../constants');

class ProductService {

    async getProducts() {
        const ProductModel = await db.getModel(PRODUCT);
        return ProductModel.findAll({});
    }

    async createProduct(product) {
        const ProductModel = await db.getModel(PRODUCT);
        return ProductModel.create(product);
    }

    async getProductById(id) {
        const ProductModel = await db.getModel(PRODUCT);
        return ProductModel.findByPk(id);
    }

    async getProductsByParams(params) {
        const ProductModel = await db.getModel(PRODUCT);
        return ProductModel.findAll({where: params});
    }

    async deleteByParams(params) {
        const ProductModel = await db.getModel(PRODUCT);
        return ProductModel.destroy({where: params});
    }

    async updateProduct(id, newProduct) {
        const ProductModel = await db.getModel(PRODUCT);
        return ProductModel.update(newProduct, {where: {id}});
    }

}

module.exports = new ProductService;
