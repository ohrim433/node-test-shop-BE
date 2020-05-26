let products = require('../../db/products');

class ProductService {

    productIsExist(productsList, id) {
        if (!id) return false;
        const getProductIndex = productsList.findIndex(product => product.id === id);
        return (getProductIndex > -1);
    }

    createNewProduct(product, productsList) {
        productsList.push(product);
    }

    getAllProducts(productsList) {
        return productsList;
    }

    getSingleProduct(productsList, id) {
        return productsList.find(product => product.id === id);
    }

    updateProduct(productsList, productId, newProduct) {
        const {id, title, type, price} = newProduct;
        return productsList[productId] = {...productsList[productId], id, title, type, price};
    }

    deleteProduct(productId) {
        return products.filter(product => {
            return product.id !== productId;
        });
    }

}

module.exports = new ProductService;
