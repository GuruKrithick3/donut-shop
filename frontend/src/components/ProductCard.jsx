import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { Heart, ShoppingCart, Star, Check } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useCart();
  const [added, setAdded] = useState(false);

  const isLiked = isInWishlist(product.id || product._id);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWishlistToggle = () => {
    if (isLiked) {
      removeFromWishlist(product.id || product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="bg-cream-light dark:bg-darkCard rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover-lift border border-cream dark:border-darkBg-light relative flex flex-col h-full group">
      
      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-cream/80 dark:bg-darkBg/80 backdrop-blur-sm text-textColor-light dark:text-textColor-dark hover:text-red-500 dark:hover:text-red-500 transition-colors shadow-sm"
        aria-label="Add to Wishlist"
      >
        <Heart
          size={18}
          className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-textColor-light dark:text-textColor-dark'}`}
        />
      </button>

      {/* Best Seller Ribbon */}
      {product.isBestSeller && (
        <span className="absolute top-4 left-4 z-10 bg-secondary text-darkBg font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
          Best Seller
        </span>
      )}

      {/* Product Image */}
      <div className="h-48 overflow-hidden bg-cream-dark dark:bg-darkBg relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-grow">
        <span className="text-[10px] uppercase font-bold tracking-widest text-primary dark:text-secondary mb-1">
          {product.category}
        </span>
        <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark group-hover:text-primary dark:group-hover:text-secondary transition-colors mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xs text-textColor-light/75 dark:text-textColor-dark/75 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className="fill-secondary text-secondary" />
          ))}
          <span className="text-[10px] text-textColor-light/65 dark:text-textColor-dark/65 font-medium ml-1">
            (5.0)
          </span>
        </div>

        {/* Footer info (Price & Cart Button) */}
        <div className="flex items-center justify-between pt-2 border-t border-cream dark:border-darkBg-light">
          <span className="text-xl font-black text-accent dark:text-secondary">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={handleAddToCart}
            className={`flex items-center justify-center p-3 rounded-full transition-all duration-300 ${
              added
                ? 'bg-green-500 text-white'
                : 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg'
            }`}
            title="Add to Cart"
          >
            {added ? <Check size={18} /> : <ShoppingCart size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
