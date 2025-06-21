import { Joi, validate } from 'express-validation'
const courseValidation = {
  body: Joi.object({
    image: Joi.string().optional(),
    title: Joi.string().required(),
    price: Joi.string().required(),
    description: Joi.string().optional(),
  }),
}

export const verifyCourse = validate(courseValidation, {}, {})

// const loginValidation = {
//   body: Joi.object({
//     email: Joi.string().email().required(),
//     password: Joi.string().required(),
//   }),
// }

// export const verifyLogin = validate(loginValidation, {}, {})
