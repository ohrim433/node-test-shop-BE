const {Router} = require('express');
const {productController} = require('../../controllers');
const {checkIsIdExist, checkIsDataValid} = require('../../middlewares');

const productRouter = Router();

// get all products
productRouter.get('/', productController.getAllProducts);

// create new product
productRouter.post('/', checkIsDataValid, productController.createProduct);

// use checkIsIdExist middleware
productRouter.use('/:id', checkIsIdExist);

// get single product
productRouter.get('/:id', productController.getSingleProduct);

// delete product
productRouter.delete('/:id', productController.deleteProduct);

// update product
productRouter.put('/:id', checkIsDataValid, productController.updateProduct);

module.exports = productRouter;
