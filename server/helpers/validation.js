import Joi from 'joi';

export const validateBody = (schema) => (req, res, next) => {
  const result = Joi.validate(req.body, schema);
  if (result.error) {
    return res.status(400).json(result.error);
  }

  req.body = result.value;
  next();
};

export const schemas = {
  signUpSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),

  signInSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  addFlatSchema: Joi.object().keys({
    city: Joi.string().required(),
    latLng: Joi.object().keys({
      lat: Joi.number().required(),
      lng: Joi.number().required(),
    }).required(),
    photoUrls: Joi.array().required(),
    price: Joi.number().required(),
    streetNumber: Joi.string().required(),
    street: Joi.string().required(),
  }),
};
