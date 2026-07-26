import React, { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE } from './AuthContext.jsx';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('donuts_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('donuts_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('delivery'); // delivery, pickup
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: '',
    address: '',
    phone: '',
    city: '',
    notes: ''
  });

  useEffect(() => {
    localStorage.setItem('donuts_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('donuts_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Cart operations
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id || item._id === product._id);
      if (existing) {
        return prevCart.map(item =>
          (item.id === product.id || item._id === product._id)
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId && item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        (item.id === productId || item._id === productId)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist operations
  const addToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.some(item => item.id === product.id || item._id === product._id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId && item._id !== productId));
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId || item._id === productId);
  };

  // Coupon Validation
  const applyCoupon = async (code) => {
    setCouponError('');
    try {
      const res = await fetch(`${API_BASE}/coupons/validate/${code.trim().toUpperCase()}`);
      const data = await res.json();
      
      if (!res.ok) {
        setCouponError(data.message || 'Invalid coupon code');
        setAppliedCoupon(null);
        return false;
      }

      // Check min cart amount
      const subtotal = getCartSubtotal();
      if (subtotal < data.minCartAmount) {
        setCouponError(`Min order amount of $${data.minCartAmount} required for this coupon`);
        setAppliedCoupon(null);
        return false;
      }

      setAppliedCoupon(data);
      return true;
    } catch (err) {
      setCouponError('Failed to validate coupon code');
      setAppliedCoupon(null);
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  // Financial Calculations
  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getDiscountAmount = () => {
    if (!appliedCoupon) return 0;
    const subtotal = getCartSubtotal();
    if (appliedCoupon.discountType === 'percentage') {
      return (subtotal * appliedCoupon.discountValue) / 100;
    } else {
      return Math.min(appliedCoupon.discountValue, subtotal);
    }
  };

  const getDeliveryFee = () => {
    if (deliveryMethod === 'pickup') return 0;
    const subtotal = getCartSubtotal();
    if (subtotal >= 30) return 0; // Free delivery for orders over $30
    return 3.99; // Standard flat delivery fee
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    const discount = getDiscountAmount();
    const delivery = getDeliveryFee();
    return Math.max(0, subtotal - discount + delivery);
  };

  return (
    <CartContext.Provider value={{
      cart,
      wishlist,
      appliedCoupon,
      couponError,
      deliveryMethod,
      deliveryDetails,
      setDeliveryMethod,
      setDeliveryDetails,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      applyCoupon,
      removeCoupon,
      getCartSubtotal,
      getDiscountAmount,
      getDeliveryFee,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
