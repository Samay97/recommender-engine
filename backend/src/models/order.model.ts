import { Document, model, Schema } from 'mongoose';
import { Order } from '@interfaces/order.interface';
import productModel from './product.model';

const orderSchema: Schema = new Schema({
  customerId: {
    type: String,
    required: true,
    unique: false,
  },

  products: {
    type: [productModel.schema],
    required: true,
    unique: false,
  },

  date: {
    type: Date,
    required: true,
    unique: false,
  },

  totalPrice: {
    type: Number,
    required: true,
    unique: false,
  },
});

const orderModel = model<Order & Document>('Order', orderSchema, 'order');

export default orderModel;
