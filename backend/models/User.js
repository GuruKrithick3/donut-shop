import mongoose from 'mongoose';
import { MockModel } from '../config/mockDbHelper.js';

const MONGO_URI = process.env.MONGO_URI;

let User;

if (MONGO_URI) {
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    loyaltyPoints: { type: Number, default: 0 },
    referralCode: { type: String, unique: true },
    referredBy: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  User = mongoose.model('User', userSchema);
} else {
  User = new MockModel('users');
}

export default User;
