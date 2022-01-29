import { model, Schema, Document } from 'mongoose';
import { Customer } from '@interfaces/customers.interface';

const customerSchema: Schema = new Schema({
  Firstname: {
    type: String,
    required: true,
    unique: false,
  },
  Lastname: {
    type: String,
    required: true,
    unique: false,
  },
  Gender: {
    type: String,
    required: true,
    unique: false,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  Birthday: {
    type: String,
    required: true,
    unique: false,
  },
  AddressId: {
    type: String,
    required: true,
    unique: false,
  }
});

const customerModel = model<Customer & Document>('Customer', customerSchema);

export default customerModel;