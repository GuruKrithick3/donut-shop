import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

// @desc    Get all reviews
// @route   GET /api/reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({});
    // Newest reviews first
    reviews.sort((a, b) => new Date(b.ratingDate) - new Date(a.ratingDate));
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving customer reviews' });
  }
});

// @desc    Create a new review
// @route   POST /api/reviews
router.post('/', async (req, res) => {
  const { name, rating, comment } = req.body;
  try {
    if (!name || !rating || !comment) {
      return res.status(400).json({ message: 'All review fields are required' });
    }

    const newReview = await Review.create({
      name,
      rating: Number(rating),
      comment,
      ratingDate: new Date().toISOString()
    });

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting review' });
  }
});

export default router;
