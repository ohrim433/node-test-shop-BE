const {emailActions} = require('../constants');

module.exports = {
    [emailActions.PRODUCT_CREATE]: {
        subject: '[Shop] New product was added',
        templateFileName: 'new-product'
    },

    [emailActions.PRODUCT_DELETE]: {
        subject: '[Shop] Product was deleted',
        templateFileName: 'delete-product'
    },

    [emailActions.PRODUCT_UPDATE]: {
        subject: '[Shop] Product was updated',
        templateFileName: 'update-product'
    },

    [emailActions.USER_DELETE]: {
        subject: '[Shop] User was deleted',
        templateFileName: 'delete-user'
    },

    [emailActions.USER_REGISTER]: {
        subject: '[Shop] Welcome to our shop!',
        templateFileName: 'register-user'
    },

    [emailActions.USER_UPDATE]: {
        subject: '[Shop] Your profile was updated',
        templateFileName: 'update-user'
    }
}
