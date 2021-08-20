const Joi = require("joi");

export const adminSchema = Joi.object().keys({
    name: Joi.string()
        .required()
        .empty()
        .min(3)
        .max(15)
        .trim()
        .messages({
            "string.base": `İsim metin türünde olmalıdır.`,
            "string.empty": `İsim boş bırakılamaz.`,
            "string.min": `İsim en az {#limit } karakterden olmalıdır`,
            "string.max": `İsim en fazla {#limit } karakterden olmalıdır`,
            "any.required": `İsim girilmesi zorunlu alandır.`
        }),
    lastName: Joi.string()
        .required()
        .empty()
        .min(3)
        .max(15)
        .trim()
        .messages({
            "string.base": `Soyisim metin türünde olmalıdır.`,
            "string.empty": `Soyisim boş bırakılamaz.`,
            "string.min": `Soyisim en az {#limit } karakterden olmalıdır`,
            "string.max": `Soyisim en fazla {#limit } karakterden olmalıdır`,
            "any.required": `Soyisim girilmesi zorunlu alandır.`
        }),
    email: Joi.string()
        .required()
        .empty()
        .trim()
        .email()
        .messages({
            "string.base": `E-posta metin türünde olmalıdır.`,
            "string.empty": `E-posta boş bırakılamaz.`,
            "string.email": "E-posta istenilen türde değil.",
            "any.required": `E-posta girilmesi zorunlu alandır.`
        }),
    phone: Joi.string()
        .length(11)
        .pattern(/^\d+$/)
        .required()
        .messages({
            "string.base": `Telefon istenilen biçimde  değil..`,
            "string.empty": `Telefon boş bırakılamaz.`,
            "string.length": `Telefon 11 karakterden oluşmalı`,
            "string.pattern.base":"Telefon istenilen formatta girilmedi",
            "any.required": `Telefon girilmesi zorunlu alandır.`
        }),
});

