import { Document, model, Schema } from 'mongoose';
import { ShoppingCart } from '@/interfaces/shoppingCarts.interface';

const shoppingCartSchema: Schema = new Schema({
  customerId: {
    type: String,
    required: true,
    unique: true,
  },

  products: {
    type: [String],
    required: true,
    unique: false,
  },
});

const shoppingCartModel = model<ShoppingCart & Document>('ShoppingCart', shoppingCartSchema, 'shoppingCart');

export default shoppingCartModel;
