import { model, Schema, Document } from 'mongoose';
import { Product } from '@interfaces/products.interface';

const productSchema: Schema = new Schema({
    productId: {
        type: String,
        required: true,
        unique: true
    },

    productName: {
        type: String,
        required: true,
        unique: false
    },

    description: {
        type:String,
        required: true,
        unique: false
    },

    category: {
        type: String,
        required: true,
        unique: false
    },

    price: {
        type: Number,
        required: true,
        unique: false
    },

    size: {
        type: String,
        required: false,
        unique: false
    }
});

const productModel = model<Product & Document>('Product', productSchema)

export default productModel;