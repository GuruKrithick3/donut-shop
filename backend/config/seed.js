// Seeds starter data through the real model layer (Product, User, Coupon,
// Blog, Review) instead of writing JSON files directly. This is what makes
// seeding actually reach MongoDB when MONGO_URI is set, instead of silently
// only ever touching the local mock JSON files.
import bcrypt from 'bcryptjs';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Coupon from '../models/Coupon.js';
import Blog from '../models/Blog.js';
import Review from '../models/Review.js';
import {
  adminUserSeed,
  defaultProducts,
  defaultCoupons,
  defaultBlogs,
  defaultReviews
} from './defaultData.js';

export const seedDatabase = async () => {
  // 1. Admin user
  const adminExists = await User.findOne({ email: adminUserSeed.email });
  if (!adminExists) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminUserSeed.password, salt);
    await User.create({ ...adminUserSeed, password: hashedPassword });
    console.log(`Seeded default admin user (${adminUserSeed.email} / ${adminUserSeed.password})`);
  }

  // 2. Products
  const productCount = await Product.countDocuments({});
  if (productCount === 0) {
    for (const product of defaultProducts) {
      await Product.create(product);
    }
    console.log(`Seeded ${defaultProducts.length} default products`);
  }

  // 3. Coupons
  const couponCount = await Coupon.countDocuments({});
  if (couponCount === 0) {
    for (const coupon of defaultCoupons) {
      await Coupon.create(coupon);
    }
    console.log(`Seeded ${defaultCoupons.length} default coupons`);
  }

  // 4. Blog posts
  const blogCount = await Blog.countDocuments({});
  if (blogCount === 0) {
    for (const blog of defaultBlogs) {
      await Blog.create(blog);
    }
    console.log(`Seeded ${defaultBlogs.length} default blog posts`);
  }

  // 5. Reviews
  const reviewCount = await Review.countDocuments({});
  if (reviewCount === 0) {
    for (const review of defaultReviews) {
      await Review.create(review);
    }
    console.log(`Seeded ${defaultReviews.length} default reviews`);
  }
};
