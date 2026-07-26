import mongoose from 'mongoose';
import { MockModel } from '../config/mockDbHelper.js';

const MONGO_URI = process.env.MONGO_URI;

let Review;

if (MONGO_URI) {
  const reviewSchema = new mongoose.Schema({
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    ratingDate: { type: Date, default: Date.now }
  });
  Review = mongoose.model('Review', reviewSchema);
} else {
  Review = new MockModel('reviews');
}

export default Review;
