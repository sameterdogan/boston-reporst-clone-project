const Joi = require("joi");

export const subCategorySchema = Joi.object().keys({
  /*  subCategory: Joi.string()
        .required()
        .empty()
        .min(5)
        .messages({
            "string.base": `Alt kategori metin türünde olmalıdır.`,
            "string.empty": `Alt kategori boş bırakılamaz.`,
            "string.min": `Alt kategori en az {#limit } karakterden olmalıdır`,
            "any.required": `Alt kategori girilmesi zorunlu alandır.`
        })*/
});