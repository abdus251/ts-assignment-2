import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .regex(/^[A-Za-z]+$/, { name: 'letters' })
    .message('First Name should be alphabetic and no more than 20 characters'),

  lastName: Joi.string()
    .required()
    .trim()
    .regex(/^[A-Za-z]+$/, { name: 'letters' })
    .message('Last Name should be alphabetic'),
});

const addressSchema = Joi.object({
  street: Joi.string()
    .required()
    .messages({ 'any.required': 'Street is required' }),
  city: Joi.string()
    .required()
    .messages({ 'any.required': 'City is required' }),
  country: Joi.string()
    .required()
    .messages({ 'any.required': 'Country is required' }),
});

const ordersSchema = Joi.object({
  productName: Joi.string()
    .required()
    .messages({ 'any.required': 'Product Name is required' }),
  price: Joi.number()
    .required()
    .messages({ 'any.required': 'Price is required' }),
  quantity: Joi.number()
    .required()
    .messages({ 'any.required': 'Quantity is required' }),
});

const hobbiesSchema = Joi.object({
  hobbies: Joi.array().items(
    Joi.object({
      type: Joi.string(),
      gardening: Joi.string(),
      traveling: Joi.string(),
      youTubing: Joi.string(),
    }),
  ),
});

const userValidationSchema = Joi.object({
  userId: Joi.number(),
  password: Joi.string()
    .max(20)
    .required()
    .messages({ 'any.required': 'Password is required' }),

  userName: userNameValidationSchema
    .required()
    .messages({ 'any.required': 'User Name is required' }),
  age: Joi.number(),
  email: Joi.string()
    .required()
    .trim()
    .email({ tlds: { allow: false } })
    .message('Email should be a valid email address'),
  isActive: Joi.boolean(),
  hobbies: hobbiesSchema,
  address: addressSchema,
  orders: ordersSchema,
  isDeleted: Joi.boolean(),
});

export default userValidationSchema;
