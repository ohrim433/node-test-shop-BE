const {Router} = require('express');

const {productController} = require('../../controllers');
const {checkIsProductIdExist, checkIsProductDataValid} = require('../../middlewares');

const productRouter = Router();

// get all products
productRouter.get('/', productController.getAllProducts);

// create new product
productRouter.post('/', checkIsProductDataValid, productController.createProduct);

// use checkIsIdExist middleware
productRouter.use('/:productId', checkIsProductIdExist);

// get single product
productRouter.get('/:productId', productController.getSingleProduct);

// delete product
productRouter.delete('/:productId', productController.deleteProduct);

// update product
productRouter.put('/:productId', checkIsProductDataValid, productController.updateProduct);

module.exports = productRouter;
