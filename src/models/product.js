import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  photos: [String],
  category: { 
    type: String,
    required: true,
  },
});

const Product = mongoose.model('product', ProductSchema);

export default Product;
