const {Router} = require('express');
const {productController} = require('../../controllers');
const {checkIdValidity, checkUpdateValidity, checkNewProductValidity} = require('../../middlewares');

const productRouter = Router();

// get all products
productRouter.get('/', productController.getAllProducts);

// get single product
productRouter.get('/:id', checkIdValidity, productController.getSingleProduct);

// create new product
productRouter.post('/', checkNewProductValidity, productController.createProduct);

// update product
productRouter.put('/:id', checkIdValidity, checkUpdateValidity, productController.updateProduct);

// delete product
productRouter.delete('/:id', checkIdValidity, productController.deleteProduct);

module.exports = productRouter;
