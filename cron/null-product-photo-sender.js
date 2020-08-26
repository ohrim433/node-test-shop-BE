const {emailActions: {PRODUCT_PHOTO_MISSED}} = require('../constants');
const {FRONTEND_URL} = require('../config');
const {emailService, productService, userService} = require('../services');

module.exports = async () => {
    const emptyPhotos = await productService.getProductsByParams({photo: null});

    for (const val of emptyPhotos) {
        const {id, title, createdBy} = val.dataValues;
        const {name, email} = await userService.getUserById(createdBy);
        const productUpdateUrl = FRONTEND_URL + `product/${id}/update (it's fake url to be honest)`;

        await emailService.sendMail(
            email,
            PRODUCT_PHOTO_MISSED,
            {
                userName: name,
                productTitle: title,
                productUpdateUrl
            })
        console.log(`Email about product ${title} was sent to user ${name}`);
    }
}
