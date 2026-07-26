import mongoose from 'mongoose';
import { MockModel } from '../config/mockDbHelper.js';

const MONGO_URI = process.env.MONGO_URI;

let Coupon;

if (MONGO_URI) {
  const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountType: { type: String, required: true }, // percentage, fixed
    discountValue: { type: Number, required: true },
    minCartAmount: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
  });
  Coupon = mongoose.model('Coupon', couponSchema);
} else {
  Coupon = new MockModel('coupons');
}

export default Coupon;
