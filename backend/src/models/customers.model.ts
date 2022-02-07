import { model, Schema, Document, Date } from 'mongoose';
import { Customer } from '@interfaces/customers.interface';

const customerSchema: Schema = new Schema({
  firstname: {
    type: String,
    required: true,
    unique: false,
  },
  lastname: {
    type: String,
    required: true,
    unique: false,
  },
  gender: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  birthday: {
    type: Date,
    min: '1920-01-01',
    max: '2022-01-01',
    required: true,
    unique: false,
  },
  addressId: {
    type: String,
    required: true,
    unique: false,
  }
});

const customerModel = model<Customer & Document>('Customer', customerSchema);

export default customerModel;
