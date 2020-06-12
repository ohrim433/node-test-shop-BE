const {dbNames: {DB_PRODUCTS_TABLE}, emailActions, responceStatusCodes} = require('../../constants');
const {fileUpload} = require('../../helpers');
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
            const [photo] = req.photos;

            const {id} = await productService.createProduct(product);

            const {name, email} = await userService.getUserById(userId);

            if (photo) {
                await fileUpload(photo, 'products', 'photos', DB_PRODUCTS_TABLE, userId, id);
            } else {
                await productService.updateProduct(id, {createdBy: userId});
            }

            await emailService.sendMail(
                email,
                emailActions.PRODUCT_CREATE,
                {
                    userName: name,
                    productTitle: product.title,
                    productType: product.type,
                    productPrice: product.price
                }
            );

            res.sendStatus(responceStatusCodes.CREATED);  // The HTTP 201 Created success status response code
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

            res.sendStatus(responceStatusCodes.NO_CONTENT);
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

            res.sendStatus(responceStatusCodes.OK);
        } catch (e) {
            next(e);
        }
    }
}
