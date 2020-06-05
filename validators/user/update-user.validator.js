const Joi = require('joi');

module.exports = Joi.object().keys({
    name: Joi.string().trim().min(2).max(60),
    age: Joi.number().integer().min(1).max(120)
});
