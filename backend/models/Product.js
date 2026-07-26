import mongoose from 'mongoose';
import { MockModel } from '../config/mockDbHelper.js';

const MONGO_URI = process.env.MONGO_URI;

let Product;

if (MONGO_URI) {
  const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    isBestSeller: { type: Boolean, default: false },
    inStock: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  Product = mongoose.model('Product', productSchema);
} else {
  Product = new MockModel('products');
}

export default Product;
