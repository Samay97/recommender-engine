import { Document, model, Schema } from 'mongoose';
import { Ratings } from '@interfaces/ratings.interface';

const ratingsSchema: Schema = new Schema({
  customerId: {
    type: String,
    required: true,
    unique: false,
  },

  productId: {
    type: String,
    required: true,
    unique: false,
  },

  rating: {
    type: Number,
    required: true,
    unique: false,
  },

  timestamp: {
    type: Date,
    required: true,
    unique: false,
  },
});

const ratingModel = model<Ratings & Document>('Ratings', ratingsSchema, 'ratings');

export default ratingModel;
