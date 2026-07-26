import express from 'express';
import Product from '../models/Product.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all products
// @route   GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving products' });
  }
});

// @desc    Create a product
// @route   POST /api/products
router.post('/', protect, adminOnly, async (req, res) => {
  const { name, category, description, price, image, isBestSeller, inStock } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      category,
      description: description || '',
      price: Number(price),
      image: image || 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80',
      isBestSeller: Boolean(isBestSeller),
      inStock: inStock !== undefined ? Boolean(inStock) : true
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
router.put('/:id', protect, adminOnly, async (req, res) => {
  const { name, category, description, price, image, isBestSeller, inStock } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, {
      name: name || product.name,
      category: category || product.category,
      description: description !== undefined ? description : product.description,
      price: price !== undefined ? Number(price) : product.price,
      image: image || product.image,
      isBestSeller: isBestSeller !== undefined ? Boolean(isBestSeller) : product.isBestSeller,
      inStock: inStock !== undefined ? Boolean(inStock) : product.inStock
    });

    res.json(updated);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

export default router;
