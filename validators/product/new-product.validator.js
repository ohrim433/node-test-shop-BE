const Joi = require('joi');

module.exports = Joi.object().keys({
    title: Joi.string().trim().min(3).max(80).required(),
    type: Joi.string().trim().min(3).max(60).required(),
    price: Joi.number().min(1).max(100000).required(),
    photo: Joi.string(),
    file: Joi.string()
})
