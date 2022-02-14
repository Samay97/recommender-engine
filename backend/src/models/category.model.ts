import { Document, model, Schema } from 'mongoose';
import { Category } from '@interfaces/category.interface';

const categorySchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  logo: {
    type: String,
    required: false,
    unique: false,
  },
});

const categoryModel = model<Category & Document>('Category', categorySchema, 'category');

export default categoryModel;
