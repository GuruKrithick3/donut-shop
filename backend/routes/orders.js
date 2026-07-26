import express from 'express';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Generate order tracking code helper
const generateTrackingCode = () => {
  return 'DONUT-' + Math.floor(100000 + Math.random() * 900000);
};

// @desc    Place a new order
// @route   POST /api/orders
router.post('/', async (req, res) => {
  const {
    userId,
    items,
    totalAmount,
    discountAmount,
    finalAmount,
    deliveryMethod,
    deliveryDetails,
    paymentMethod
  } = req.body;

  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order items are required' });
    }

    const trackingCode = generateTrackingCode();

    // If order has an authenticated user, award loyalty points (10 points per dollar spent)
    if (userId && userId !== 'guest') {
      const user = await User.findById(userId);
      if (user) {
        const pointsEarned = Math.floor(finalAmount * 10);
        const newPoints = (user.loyaltyPoints || 0) + pointsEarned;
        await User.findByIdAndUpdate(userId, { loyaltyPoints: newPoints });
      }
    }

    const newOrder = await Order.create({
      userId: userId || 'guest',
      items,
      totalAmount: Number(totalAmount),
      discountAmount: Number(discountAmount || 0),
      finalAmount: Number(finalAmount),
      status: 'Received',
      deliveryMethod,
      deliveryDetails,
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      trackingCode
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error processing order' });
  }
});

// @desc    Get user's own orders
// @route   GET /api/orders/me
router.get('/me', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id || req.user.id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order history' });
  }
});

// @desc    Track an order by its tracking code or order ID
// @route   GET /api/orders/track/:code
router.get('/track/:code', async (req, res) => {
  const code = req.params.code;
  try {
    // Check tracking code
    let order = await Order.findOne({ trackingCode: code });
    if (!order) {
      // Check as standard ID
      order = await Order.findById(code);
    }
    
    if (!order) {
      return res.status(404).json({ message: 'Order tracking details not found' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error tracking order' });
  }
});

// @desc    Get all orders (admin only)
// @route   GET /api/orders
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find({});
    // Sort orders by date descending
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving order queue' });
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  const { status, paymentStatus } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const updated = await Order.findByIdAndUpdate(req.params.id, {
      status: status || order.status,
      paymentStatus: paymentStatus || order.paymentStatus
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order status' });
  }
});

export default router;
