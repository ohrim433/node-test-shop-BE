const Joi = require('joi');

const {regexp} = require('../../constants');

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(60).required(),
    email: Joi.string().regex(regexp.EMAIL).required(),
    age: Joi.number().integer().min(1).max(120).required(),
    password: Joi.string().trim().min(6).required(),
});
