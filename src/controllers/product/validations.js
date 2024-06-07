import Joi from 'joi';

const ProductSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().min(3),
  price: Joi.number().required(),
  category: Joi.string().valid('Rings', 'Necklaces', 'Bracelets').required(),
  photos: Joi.string(),

});

export default ProductSchema;
