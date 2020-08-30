const Joi = require('joi');

const {regexEnum: {EMAIL, NAME, PASSWORD}} = require('../../constants');

module.exports = Joi.object().keys({
    name: Joi.string().regex(NAME).required(),
    email: Joi.string().regex(EMAIL).required(),
    password: Joi.string().regex(PASSWORD).required(),
});
