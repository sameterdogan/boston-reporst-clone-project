import Joi from "joi"

export const reportSchema = Joi.object().keys({
    title:Joi.string()
        .required()
        .empty()
        .min(5)
        .max(50)
        .messages({
            "string.base": `Başlık metin türünde olmalıdır.`,
            "string.empty": `Başlık boş bırakılamaz.`,
            "string.min": `Başlık en az {#limit } karakterden olmalıdır`,
            "string.max":'Başlık en fazla {#limit} karakterden oluşmalı.',
            "any.required": `Başlık girilmesi zorunlu alandır.`
        }),
    description:Joi.string()
        .required()
        .empty()
        .min(20)
        .messages({
            "string.base": `Açıklama metin türünde olmalıdır.`,
            "string.empty": `Açıklama boş bırakılamaz.`,
            "string.min": `Açıklama en az {#limit } karakterden olmalıdır`,
            "any.required": `Açıklama girilmesi zorunlu alandır.`
        }),
    location: Joi.object({
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
        street:  Joi.string()
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
});