import { model, Schema, Document } from 'mongoose';
import { Order } from '@interfaces/order.interface';

const orderSchema: Schema = new Schema({
  customerId: {
    type: String,
    required: true,
    unique: false,
  },

  products: {
    type: [String],
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
