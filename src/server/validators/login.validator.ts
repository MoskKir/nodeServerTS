import Joi from "@hapi/joi";

const loginSchema: Joi.ObjectSchema = Joi.object({
    name: Joi.string()
        .min(5)
        .required()
        .trim(),

    password: Joi.string()
        .min(3)
        .required()
        .trim()
});


export default loginSchema;