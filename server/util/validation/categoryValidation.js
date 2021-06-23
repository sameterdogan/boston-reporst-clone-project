const Joi = require("joi");

export const categorySchema = Joi.object().keys({
    category: Joi.string()
        .required()
        .empty()
        .min(5)
        .messages({
            "string.base": `kategori metin türünde olmalıdır.`,
            "string.empty": `kategori boş bırakılamaz.`,
            "string.min": `kategori en az {#limit } karakterden olmalıdır`,
            "any.required": `kategori girilmesi zorunlu alandır.`
        })
});