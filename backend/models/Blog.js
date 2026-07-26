import mongoose from 'mongoose';
import { MockModel } from '../config/mockDbHelper.js';

const MONGO_URI = process.env.MONGO_URI;

let Blog;

if (MONGO_URI) {
  const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    publishedAt: { type: Date, default: Date.now }
  });
  Blog = mongoose.model('Blog', blogSchema);
} else {
  Blog = new MockModel('blogs');
}

export default Blog;
