import Joi from 'joi';

const OrderSchema = Joi.object({
  user: Joi.string().required(),
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  address: Joi.string().required(),
  items: Joi.array().items(Joi.string().required()).required()
});

export default OrderSchema;
