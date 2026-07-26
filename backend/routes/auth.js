import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'secret-donuts-key-12345';

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, referredByCode } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate user referral code
    const referralCode = 'DONUTS-' + Math.random().toString(36).substring(2, 7).toUpperCase();

    // Setup base user values
    let points = 50; // Welcome points
    let referredBy = '';

    // Check referral code
    if (referredByCode) {
      const referrer = await User.findOne({ referralCode: referredByCode.trim().toUpperCase() });
      if (referrer) {
        referredBy = referrer.name;
        // Credit referrer with 100 points
        const newPoints = (referrer.loyaltyPoints || 0) + 100;
        await User.findByIdAndUpdate(referrer._id || referrer.id, { loyaltyPoints: newPoints });
        // Give new user 100 extra points
        points += 100;
      }
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: false,
      loyaltyPoints: points,
      referralCode,
      referredBy
    });

    res.status(201).json({
      _id: newUser._id || newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      loyaltyPoints: newUser.loyaltyPoints,
      referralCode: newUser.referralCode,
      token: generateToken(newUser._id || newUser.id)
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// @desc    User Login
// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id || user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      loyaltyPoints: user.loyaltyPoints,
      referralCode: user.referralCode,
      token: generateToken(user._id || user.id)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// @desc    Get user profile details
// @route   GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  res.json({
    _id: req.user._id || req.user.id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
    loyaltyPoints: req.user.loyaltyPoints,
    referralCode: req.user.referralCode,
    referredBy: req.user.referredBy
  });
});

// @desc    Get all users list (admin only)
// @route   GET /api/auth/users
router.get('/users', protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find({});
    // Exclude password hashes
    const cleanUsers = users.map(user => ({
      _id: user._id || user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      loyaltyPoints: user.loyaltyPoints || 0,
      referralCode: user.referralCode,
      createdAt: user.createdAt
    }));
    res.json(cleanUsers);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users list' });
  }
});

export default router;
