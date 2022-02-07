import { model, Schema, Document } from 'mongoose';
import { Product } from '@interfaces/products.interface';

const productSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },

    description: {
        type:String,
        required: true,
        unique: false
    },

    images: {
        type: [String],
        required: true,
        unique: false
    },

    main_image: {
      type: String,
      required: false,
      unique: false
    },

    price: {
        type: Number,
        required: true,
        unique: false
    },

    rating: {
        type: Number,
        required: false,
        unique: false
    },

    ratings_total: {
      type: Number,
      required: false,
      unique: false
    },

    best_seller: {
      type: String,
      required: false,
      unique: false
    },

    category: {
      type: String,
      required: true,
      unique: false
    }
});

const productModel = model<Product & Document>('Product', productSchema)

export default productModel;
