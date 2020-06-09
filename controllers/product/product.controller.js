const {emailActions} = require('../../constants');
const {emailService, productService, userService} = require('../../services');

module.exports = {

    getAllProducts: async (req, res) => {
        let products = await productService.getProducts();

        res.json(products);
    },

    createProduct: async (req, res, next) => {
        try {
            const product = req.body;
            const userId = req.userId;

            await productService.createProduct(product);

            const user = await userService.getUserById(userId);

            await emailService.sendMail(
                user.email,
                emailActions.PRODUCT_CREATE,
                {
                    userName: user.name,
                    productTitle: product.title,
                    productType: product.type,
                    productPrice: product.price
                }
            );

            res.sendStatus(201);  // The HTTP 201 Created success status response code
        } catch (e) {
            next(e);
        }
    },

    getSingleProduct: async (req, res) => {
        res.json(req.product);
    },

    deleteProduct: async (req, res, next) => {
        try {
            const {productId} = req.params;
            const userId = req.userId;
            const product = req.product;

            await productService.deleteByParams({id: productId});

            const user = await userService.getUserById(userId);

            await emailService.sendMail(
                user.email,
                emailActions.PRODUCT_DELETE,
                {
                    userName: user.name,
                    productTitle: product.title
                }
            );

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }

        res.end();
    },

    updateProduct: async (req, res, next) => {
        try {
            const {id} = req.product;
            const product = req.body;
            const userId = req.userId;

            await productService.updateProduct(+id, product);

            const user = await userService.getUserById(userId);

            await emailService.sendMail(
                user.email,
                emailActions.PRODUCT_UPDATE,
                {
                    userName: user.name,
                    productTitle: product.title,
                    productType: product.type,
                    productPrice: product.price
                }
            );

            // The HTTP 200 OK success status response code indicates that the request has succeeded
            res.sendStatus(200);
        } catch (e) {
            next(e);
        }
    }
}
