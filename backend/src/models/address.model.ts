import { model, Schema, Document } from 'mongoose';
import { Address } from '@interfaces/address.interface';

const addressSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  addressId: {
    type: String,
    required: true,
    unique: true
  },
  customerId: {
    type: String,
    required: true,
    unique: false
  },
  address: {
  type: String,
  required: true,
  unique: true
  },
  city: {
  type: String,
  required: true,
  unique: false
  }
});

const addressModel = model<Address & Document>('Address', addressSchema);

export default addressModel;
