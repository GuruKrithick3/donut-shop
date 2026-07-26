import mongoose from 'mongoose';
import { MockModel } from '../config/mockDbHelper.js';

const MONGO_URI = process.env.MONGO_URI;

let Order;

if (MONGO_URI) {
  const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    items: [{
      productId: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String }
    }],
    totalAmount: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
    status: { type: String, default: 'Received' }, // Received, Preparing, Out for Delivery, Delivered
    deliveryMethod: { type: String, required: true }, // delivery, pickup
    deliveryDetails: {
      name: { type: String },
      address: { type: String },
      phone: { type: String },
      city: { type: String },
      notes: { type: String }
    },
    paymentMethod: { type: String, required: true }, // Credit Card, Debit Card, UPI, Cash on Delivery
    paymentStatus: { type: String, default: 'Pending' }, // Pending, Paid
    trackingCode: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  Order = mongoose.model('Order', orderSchema);
} else {
  Order = new MockModel('orders');
}

export default Order;
