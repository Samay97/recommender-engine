import { model, Schema, Document } from 'mongoose';
import { Product } from '@interfaces/products.interface';

const productSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },

  description: {
    type: String,
    required: true,
    unique: false,
  },

  images: {
    type: [String],
    required: true,
    unique: false,
  },

  mainImage: {
    type: String,
    required: false,
    unique: false,
  },

  price: {
    type: Number,
    required: true,
    unique: false,
  },

  rating: {
    type: Number,
    required: false,
    unique: false,
  },

  ratingsTotal: {
    type: Number,
    required: false,
    unique: false,
  },

  bestSeller: {
    type: Boolean,
    required: false,
    unique: false,
  },

  category: {
    type: String,
    required: true,
    unique: false,
  },
});

const productModel = model<Product & Document>('Product', productSchema, 'product');

export default productModel;
