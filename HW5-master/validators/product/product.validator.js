const Joi = require('joi')

const {regexEnum: {NAME, PRICE}} = require('../../constans')

module.exports = Joi.object().keys({
    name: Joi.string().regex(NAME).required(),
    price: Joi.string().regex(PRICE).required(),
})
