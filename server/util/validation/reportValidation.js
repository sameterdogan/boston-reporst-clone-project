import Joi from "joi"

export const reportSchema = Joi.object().keys({
  /*  location: Joi.object({
        district: Joi.string()
            .required()
            .empty()
             .messages({
                "string.base": `İlçe metin türünde olmalıdır.`,
                "string.empty": `İlçe boş bırakılamaz.`,
                "any.required": `İlçe girilmesi zorunlu alandır.`
            }),
        neighborhood:  Joi.string()
            .required()
            .empty()
            .messages({
                "string.base": `Mahalle metin türünde olmalıdır.`,
                "string.empty": `Mahalle boş bırakılamaz.`,
                "string.min": `Mahalle en az {#limit } karakterden olmalıdır`,
                "any.required": `Mahalle girilmesi zorunlu alandır.`
            }),
        Street:  Joi.string()
            .required()
            .empty()
            .messages({
                "string.base": `Sokak metin türünde olmalıdır.`,
                "string.empty": `Sokak boş bırakılamaz.`,
                "any.required": `Sokak girilmesi zorunlu alandır.`
            })
    }).required()
        .messages({
            "object.base":"Konum bilgisi obje türünde olmalıdır",
            "any.required": `konum bilgisi  girilmesi zorunlu alandır.`
        })
*/
});