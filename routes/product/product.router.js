const {Router} = require('express');
const {productController} = require('../../controllers');
const {checkIsIdExist, checkIsDataValid} = require('../../middlewares');

const productRouter = Router();

// get all products
productRouter.get('/', productController.getAllProducts);

// get single product
productRouter.get('/:id', checkIsIdExist, productController.getSingleProduct);

// create new product
productRouter.post('/', checkIsDataValid, productController.createProduct);

// delete product
productRouter.delete('/:id', checkIsIdExist, productController.deleteProduct);

// update product
productRouter.put('/:id', checkIsIdExist, checkIsDataValid, productController.updateProduct);

module.exports = productRouter;
