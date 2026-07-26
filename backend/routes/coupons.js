import express from 'express';
import Coupon from '../models/Coupon.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @desc    Validate coupon code
// @route   GET /api/coupons/validate/:code
router.get('/validate/:code', async (req, res) => {
  const code = req.params.code.toUpperCase();
  try {
    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon code not found' });
    }
    if (!coupon.active) {
      return res.status(400).json({ message: 'This coupon is no longer active' });
    }
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: 'Error validating coupon' });
  }
});

// @desc    Get all coupons (admin only)
// @route   GET /api/coupons
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const coupons = await Coupon.find({});
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving coupons' });
  }
});

// @desc    Create a new coupon (admin only)
// @route   POST /api/coupons
router.post('/', protect, adminOnly, async (req, res) => {
  const { code, discountType, discountValue, minCartAmount } = req.body;
  try {
    if (!code || !discountType || !discountValue) {
      return res.status(400).json({ message: 'All coupon details are required' });
    }

    const couponExists = await Coupon.findOne({ code: code.toUpperCase() });
    if (couponExists) {
      return res.status(400).json({ message: 'Coupon with this code already exists' });
    }

    const newCoupon = await Coupon.create({
      code: code.toUpperCase(),
      discountType,
      discountValue: Number(discountValue),
      minCartAmount: Number(minCartAmount || 0),
      active: true
    });

    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(500).json({ message: 'Error creating coupon' });
  }
});

// @desc    Delete coupon (admin only)
// @route   DELETE /api/coupons/:id
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }
    await Coupon.findByIdAndDelete(req.params.id);
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting coupon' });
  }
});

export default router;
