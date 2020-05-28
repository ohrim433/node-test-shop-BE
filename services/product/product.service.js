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

    async deleteProduct(productId) {
        const ProductModel = await db.getModel('Product');
        return ProductModel.destroy({
            where: {
                id: productId
            }
        });
    }

    async updateProduct(productId, newProduct) {
        const ProductModel = await db.getModel('Product');
        ProductModel.update(newProduct,
            {
                where: {
                    id: productId
                }
            });
    }

}

module.exports = new ProductService;
