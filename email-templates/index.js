const {emailActions, emailSubjects, emailTemplatesNames} = require('../constants');

module.exports = {
    [emailActions.PRODUCT_CREATE]: {
        subject: emailSubjects.NEW_PRODUCT_SUBJECT,
        templateFileName: emailTemplatesNames.NEW_PRODUCT
    },

    [emailActions.PRODUCT_DELETE]: {
        subject: emailSubjects.DELETE_PRODUCT_SUBJECT,
        templateFileName: emailTemplatesNames.DELETE_PRODUCT
    },

    [emailActions.PRODUCT_UPDATE]: {
        subject: emailSubjects.UPDATE_PRODUCT_SUBJECT,
        templateFileName: emailTemplatesNames.UPDATE_PRODUCT
    },

    [emailActions.USER_DELETE]: {
        subject: emailSubjects.DELETE_USER_SUBJECT,
        templateFileName: emailTemplatesNames.DELETE_USER
    },

    [emailActions.USER_REGISTER]: {
        subject: emailSubjects.NEW_USER_SUBJECT,
        templateFileName: emailTemplatesNames.NEW_USER
    },

    [emailActions.USER_UPDATE]: {
        subject: emailSubjects.UPDATE_USER_SUBJECT,
        templateFileName: emailTemplatesNames.UPDATE_USER
    }
}
