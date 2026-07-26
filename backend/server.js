import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { seedDefaultData } from './config/mockDbHelper.js';

// Import Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import reviewRoutes from './routes/reviews.js';
import couponRoutes from './routes/coupons.js';
import blogRoutes from './routes/blog.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes Mounts
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/blogs', blogRoutes);

// Server status endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    business: 'DONUTS',
    databaseMode: process.env.MONGO_URI ? 'MongoDB' : 'Mock JSON Filesystem fallback'
  });
});

// Database initialization & server startup
const init = async () => {
  const MONGO_URI = process.env.MONGO_URI;

  if (MONGO_URI) {
    console.log('Attempting MongoDB connection...');
    try {
      await mongoose.connect(MONGO_URI);
      console.log('MongoDB connection established successfully!');
    } catch (err) {
      console.error('MongoDB connection failed. Continuing in local mock JSON filesystem fallback mode.', err.message);
      process.env.MONGO_URI = ''; // Disable uri so models load from local mock
    }
  } else {
    console.log('No MONGO_URI environment variable detected. Running in Local Mock JSON Filesystem mode.');
  }

  // Seed data (creates default admin, products, coupons, blogs, reviews)
  await seedDefaultData();

  app.listen(PORT, () => {
    console.log(`DONUTS backend server running on port http://localhost:${PORT}`);
  });
};

init().catch(err => {
  console.error('Fatal initialization error:', err);
});
