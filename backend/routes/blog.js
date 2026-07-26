import express from 'express';
import Blog from '../models/Blog.js';

const router = express.Router();

// @desc    Get all blog articles
// @route   GET /api/blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    // Newest blogs first
    blogs.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blog posts' });
  }
});

// @desc    Get single blog article
// @route   GET /api/blogs/:id
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog article not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving blog details' });
  }
});

export default router;
