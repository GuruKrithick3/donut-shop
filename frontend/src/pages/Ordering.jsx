import React, { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth, API_BASE } from '../context/AuthContext.jsx';
import { Link } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  CreditCard,
  Phone,
  MapPin,
  Tag,
  Truck,
  Store,
  CheckCircle,
  Clock,
  Heart,
  Copy,
  ChevronRight,
  ShieldCheck,
  Search
} from 'lucide-react';

const Ordering = () => {
  const { user } = useAuth();
  const {
    cart,
    wishlist,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    removeFromWishlist,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    deliveryMethod,
    setDeliveryMethod,
    getCartSubtotal,
    getDiscountAmount,
    getDeliveryFee,
    getCartTotal
  } = useCart();

  // Navigation tabs: 'checkout' vs 'tracking'
  const [activeTab, setActiveTab] = useState('checkout');

  // Checkout Wizard steps: 1 (Cart), 2 (Details & Payment), 3 (Confirmation)
  const [step, setStep] = useState(1);

  // Delivery details Form
  const [name, setName] = useState(user ? user.name : '');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  // Coupon text state
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponSuccess, setCouponSuccess] = useState(false);

  // Checkout submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Tracking query states
  const [trackCode, setTrackCode] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [trackingError, setTrackingError] = useState('');
  const [trackingLoading, setTrackingLoading] = useState(false);

  const subtotal = getCartSubtotal();
  const discount = getDiscountAmount();
  const deliveryFee = getDeliveryFee();
  const total = getCartTotal();

  // Copy tracking code helper
  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert('Tracking code copied to clipboard!');
  };

  // Apply Promo Code
  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponSuccess(false);
    const success = await applyCoupon(couponCode);
    setCouponLoading(false);
    if (success) {
      setCouponSuccess(true);
      setCouponCode('');
    }
  };

  // Submit checkout order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!name || !phone || (deliveryMethod === 'delivery' && (!address || !city))) {
      alert('Please fill out all required shipping and contact fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        userId: user ? (user._id || user.id) : 'guest',
        items: cart.map(item => ({
          productId: item.id || item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        })),
        totalAmount: subtotal,
        discountAmount: discount,
        finalAmount: total,
        deliveryMethod,
        deliveryDetails: {
          name,
          phone,
          address: deliveryMethod === 'delivery' ? address : 'N/A (Store Pickup)',
          city: deliveryMethod === 'delivery' ? city : 'N/A',
          notes
        },
        paymentMethod
      };

      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();

      if (res.ok) {
        setConfirmedOrder(data);
        clearCart();
        setStep(3); // Go to confirmation screen
      } else {
        alert(data.message || 'Failed to place order');
      }
    } catch (err) {
      console.error('Checkout submit error:', err);
      alert('Network error placing order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Track order code search
  const handleTrackOrder = async (e) => {
    e.preventDefault();
    if (!trackCode.trim()) return;
    setTrackingLoading(true);
    setTrackingError('');
    setTrackedOrder(null);
    try {
      const res = await fetch(`${API_BASE}/orders/track/${trackCode.trim()}`);
      const data = await res.json();
      if (res.ok) {
        setTrackedOrder(data);
      } else {
        setTrackingError(data.message || 'Tracking code not found');
      }
    } catch (err) {
      setTrackingError('Network error checking order progress.');
    } finally {
      setTrackingLoading(false);
    }
  };

  // Get Order Status Steps styling helper
  const getStatusStepClass = (currentStatus, targetStatus) => {
    const statuses = ['Received', 'Preparing', 'Out for Delivery', 'Delivered'];
    const currentIndex = statuses.indexOf(currentStatus);
    const targetIndex = statuses.indexOf(targetStatus);

    if (currentIndex >= targetIndex) {
      return 'bg-green-500 text-white border-green-500';
    }
    return 'bg-cream-dark text-textColor-light/40 border-cream-dark dark:bg-darkBg-light dark:text-textColor-dark/30';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Tab controls */}
      <div className="flex justify-center border-b-2 border-cream dark:border-darkBg-light mb-12 max-w-lg mx-auto">
        <button
          onClick={() => setActiveTab('checkout')}
          className={`flex-1 pb-4 text-sm font-extrabold uppercase tracking-wider border-b-4 transition-all duration-300 ${
            activeTab === 'checkout'
              ? 'border-primary text-primary dark:border-secondary dark:text-secondary'
              : 'border-transparent text-textColor-light/50 dark:text-textColor-dark/50'
          }`}
        >
          Checkout Cart
        </button>
        <button
          onClick={() => setActiveTab('tracking')}
          className={`flex-1 pb-4 text-sm font-extrabold uppercase tracking-wider border-b-4 transition-all duration-300 ${
            activeTab === 'tracking'
              ? 'border-primary text-primary dark:border-secondary dark:text-secondary'
              : 'border-transparent text-textColor-light/50 dark:text-textColor-dark/50'
          }`}
        >
          Track Order
        </button>
      </div>

      {/* TABS CONTAINER */}
      {activeTab === 'checkout' ? (
        <div>
          {/* STEP 1: REVIEW SHOPPING CART */}
          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Cart List */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between border-b border-cream dark:border-darkBg-light pb-4">
                  <h1 className="text-2xl font-black text-textColor-light dark:text-textColor-dark">
                    Your Shopping Cart
                  </h1>
                  <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {cart.length} unique items
                  </span>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-16 bg-cream-light dark:bg-darkCard rounded-[40px] border border-cream dark:border-darkBg-light">
                    <ShoppingBag size={48} className="mx-auto text-primary mb-4" />
                    <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark">Your Cart is Empty</h3>
                    <p className="text-xs text-textColor-light/75 dark:text-textColor-dark/75 mt-1">Add some delicious fresh donuts from our menu to get started!</p>
                    <Link to="/menu" className="mt-6 inline-block bg-primary text-white font-bold px-6 py-2.5 rounded-full text-xs shadow hover:bg-primary-dark transition-colors">
                      Browse Menu
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        key={item.id || item._id}
                        className="flex flex-col sm:flex-row items-center justify-between bg-cream-light dark:bg-darkCard p-4 rounded-3xl border border-cream dark:border-darkBg-light shadow-sm gap-4"
                      >
                        <div className="flex items-center space-x-4 w-full sm:w-auto">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-2xl object-cover shrink-0"
                          />
                          <div>
                            <h3 className="font-bold text-sm text-textColor-light dark:text-textColor-dark">
                              {item.name}
                            </h3>
                            <span className="text-[10px] text-primary dark:text-secondary font-bold uppercase tracking-wider block">
                              {item.category}
                            </span>
                            <span className="text-xs text-textColor-light/75 dark:text-textColor-dark/75 block sm:hidden mt-0.5">
                              ${item.price.toFixed(2)} each
                            </span>
                          </div>
                        </div>

                        {/* Adjust quantities */}
                        <div className="flex items-center justify-between w-full sm:w-auto gap-8 border-t sm:border-t-0 pt-4 sm:pt-0">
                          <span className="text-sm font-extrabold text-textColor-light dark:text-textColor-dark hidden sm:block">
                            ${item.price.toFixed(2)}
                          </span>

                          <div className="flex items-center space-x-3 bg-cream dark:bg-darkBg p-1.5 rounded-full border border-cream-dark/30 dark:border-darkBg-light">
                            <button
                              onClick={() => updateQuantity(item.id || item._id, item.quantity - 1)}
                              className="p-1 rounded-full hover:bg-cream-dark dark:hover:bg-darkBg-light text-textColor-light dark:text-textColor-dark transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-xs font-bold text-textColor-light dark:text-textColor-dark min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => addToCart(item, 1)}
                              className="p-1 rounded-full hover:bg-cream-dark dark:hover:bg-darkBg-light text-textColor-light dark:text-textColor-dark transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <div className="flex items-center space-x-6">
                            <span className="text-sm font-black text-accent dark:text-secondary">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id || item._id)}
                              className="text-red-500 hover:text-red-700 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Wishlist panel */}
                {wishlist.length > 0 && (
                  <div className="bg-cream-light dark:bg-darkCard p-6 rounded-[32px] border border-cream dark:border-darkBg-light shadow-sm mt-8 space-y-4">
                    <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark flex items-center space-x-2">
                      <Heart className="fill-red-500 text-red-500" size={18} />
                      <span>Your Saved Wishlist ({wishlist.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {wishlist.map(item => (
                        <div key={item.id || item._id} className="flex items-center justify-between p-3 bg-cream dark:bg-darkBg rounded-2xl border border-cream-dark/10 dark:border-darkBg-light">
                          <div className="flex items-center space-x-3">
                            <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-xl shrink-0" />
                            <div>
                              <h4 className="text-xs font-bold text-textColor-light dark:text-textColor-dark line-clamp-1">{item.name}</h4>
                              <span className="text-[10px] font-bold text-accent dark:text-secondary">${item.price}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => { addToCart(item, 1); removeFromWishlist(item.id || item._id); }}
                              className="text-[10px] font-extrabold bg-primary text-white px-3 py-1.5 rounded-full hover:bg-primary-dark shadow"
                            >
                              Add to Cart
                            </button>
                            <button onClick={() => removeFromWishlist(item.id || item._id)} className="text-red-500 hover:text-red-700 p-1">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bill Details Summary Card */}
              <div className="bg-cream-light dark:bg-darkCard p-8 rounded-[40px] border border-cream dark:border-darkBg-light shadow-md space-y-6">
                <h3 className="text-xl font-black text-textColor-light dark:text-textColor-dark border-b border-cream dark:border-darkBg-light pb-4">
                  Order Summary
                </h3>

                {/* Calculations details */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-textColor-light/75 dark:text-textColor-dark/75">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span className="font-semibold">-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-textColor-light/75 dark:text-textColor-dark/75">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>

                  {deliveryMethod === 'delivery' && subtotal < 30 && subtotal > 0 && (
                    <p className="text-[10px] text-accent dark:text-secondary italic">
                      Add ${(30 - subtotal).toFixed(2)} more for FREE delivery!
                    </p>
                  )}

                  <div className="flex justify-between text-base font-bold text-textColor-light dark:text-textColor-dark border-t border-cream dark:border-darkBg-light pt-3">
                    <span>Total Amount</span>
                    <span className="text-xl text-primary dark:text-secondary">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Coupon Code Input */}
                {cart.length > 0 && (
                  <div className="pt-4 border-t border-cream dark:border-darkBg-light">
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-green-500/10 text-green-700 dark:text-green-400 p-3 rounded-2xl text-xs font-bold">
                        <div className="flex items-center space-x-1">
                          <Tag size={14} />
                          <span>Code Applied: {appliedCoupon.code}</span>
                        </div>
                        <button onClick={removeCoupon} className="text-red-500 font-extrabold underline hover:text-red-700">
                          Remove
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="space-y-2">
                        <label className="text-[10px] uppercase font-bold text-textColor-light/60 dark:text-textColor-dark/60 block">Have a Coupon?</label>
                        <div className="flex">
                          <input
                            type="text"
                            placeholder="Enter Code (e.g. DONUTLOVE)"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="w-full px-4 py-2 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-l-2xl focus:outline-none text-xs font-bold uppercase"
                          />
                          <button
                            type="submit"
                            disabled={couponLoading}
                            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-2xl text-xs font-bold shrink-0 transition-colors"
                          >
                            Apply
                          </button>
                        </div>
                        {couponError && <p className="text-[10px] text-red-500 font-semibold">{couponError}</p>}
                        {couponSuccess && <p className="text-[10px] text-green-600 font-semibold">Promo code applied successfully!</p>}
                      </form>
                    )}
                  </div>
                )}

                {/* Checkout Trigger */}
                {cart.length > 0 && (
                  <button
                    onClick={() => setStep(2)}
                    className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2 text-sm"
                  >
                    <span>Proceed to Delivery details</span>
                    <ChevronRight size={16} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: FILL OUT DELIVERY DETAILS & CHOOSE PAYMENT METHOD */}
          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Forms Section */}
              <form onSubmit={handlePlaceOrder} className="lg:col-span-2 space-y-8 bg-cream-light dark:bg-darkCard p-8 rounded-[40px] border border-cream dark:border-darkBg-light shadow-sm">
                
                {/* Method selector toggle */}
                <div>
                  <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark mb-4">
                    Delivery Option
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('delivery')}
                      className={`flex items-center justify-center space-x-2 py-3 rounded-2xl font-bold border transition-all ${
                        deliveryMethod === 'delivery'
                          ? 'bg-primary text-white border-primary shadow-md'
                          : 'bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border-cream-dark/30 dark:border-darkBg-light'
                      }`}
                    >
                      <Truck size={18} />
                      <span>Home Delivery</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('pickup')}
                      className={`flex items-center justify-center space-x-2 py-3 rounded-2xl font-bold border transition-all ${
                        deliveryMethod === 'pickup'
                          ? 'bg-primary text-white border-primary shadow-md'
                          : 'bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border-cream-dark/30 dark:border-darkBg-light'
                      }`}
                    >
                      <Store size={18} />
                      <span>Store Pickup</span>
                    </button>
                  </div>
                </div>

                {/* Form fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark border-b border-cream dark:border-darkBg-light pb-2">
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65 flex items-center space-x-1">
                        <Phone size={12} />
                        <span>Phone Number *</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold"
                      />
                    </div>
                  </div>

                  {deliveryMethod === 'delivery' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65 flex items-center space-x-1">
                          <MapPin size={12} />
                          <span>Street Address *</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Apartment, Street Name"
                          className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65">City *</label>
                        <input
                          type="text"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="New York"
                          className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65">Special Notes / Dietary request</label>
                    <textarea
                      rows="2"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. Leave package by front door / No sprinkles / extra chocolate!"
                      className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* Payment method */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark border-b border-cream dark:border-darkBg-light pb-2">
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {['Credit Card', 'Debit Card', 'UPI', 'Cash on Delivery'].map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setPaymentMethod(method)}
                        className={`py-3 px-1 rounded-2xl font-bold border text-xs text-center transition-all ${
                          paymentMethod === method
                            ? 'bg-accent text-white border-accent shadow-sm'
                            : 'bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border-cream-dark/30 dark:border-darkBg-light'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>

                  {paymentMethod !== 'Cash on Delivery' && (
                    <div className="bg-cream dark:bg-darkBg p-6 rounded-3xl border border-cream-dark/20 dark:border-darkBg-light space-y-4 animate-fade-in">
                      <span className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center space-x-1">
                        <CreditCard size={12} />
                        <span>Simulated Secure Gateway</span>
                      </span>
                      {paymentMethod === 'UPI' ? (
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-textColor-light/60 dark:text-textColor-dark/60">Enter UPI ID</label>
                          <input type="text" placeholder="example@upi" className="w-full max-w-sm px-4 py-2 bg-cream-light dark:bg-darkCard border border-cream-dark/30 dark:border-darkBg-light rounded-xl focus:outline-none text-xs font-medium" />
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div className="sm:col-span-2 space-y-1">
                            <label className="text-[10px] font-bold text-textColor-light/60 dark:text-textColor-dark/60">Card Number</label>
                            <input type="text" placeholder="4000 1234 5678 9010" className="w-full px-4 py-2 bg-cream-light dark:bg-darkCard border border-cream-dark/30 dark:border-darkBg-light rounded-xl focus:outline-none text-xs font-medium" />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-textColor-light/60 dark:text-textColor-dark/60">Expiry</label>
                              <input type="text" placeholder="12/28" className="w-full px-2 py-2 bg-cream-light dark:bg-darkCard border border-cream-dark/30 dark:border-darkBg-light rounded-xl focus:outline-none text-xs font-medium text-center" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-textColor-light/60 dark:text-textColor-dark/60">CVV</label>
                              <input type="password" placeholder="***" className="w-full px-2 py-2 bg-cream-light dark:bg-darkCard border border-cream-dark/30 dark:border-darkBg-light rounded-xl focus:outline-none text-xs font-medium text-center" />
                            </div>
                          </div>
                        </div>
                      )}
                      <p className="text-[9px] text-textColor-light/50 dark:text-textColor-dark/50 flex items-center space-x-1">
                        <ShieldCheck size={10} className="text-green-500" />
                        <span>Mock checkout. Your card credentials are never sent to a server.</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Back / Pay buttons */}
                <div className="flex space-x-4 border-t border-cream dark:border-darkBg-light pt-6">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 bg-cream dark:bg-darkBg hover:bg-cream-dark text-textColor-light dark:text-textColor-dark py-3.5 rounded-full font-bold border border-cream-dark/30 dark:border-darkBg-light transition-colors text-xs text-center"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-2/3 bg-primary hover:bg-primary-dark text-white py-3.5 rounded-full font-bold shadow-md hover:shadow-lg transition-colors text-xs flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <span>Placing Order...</span>
                    ) : (
                      <>
                        <span>Place Order (${total.toFixed(2)})</span>
                        <CheckCircle size={16} />
                      </>
                    )}
                  </button>
                </div>

              </form>

              {/* Order Items summary sidebar */}
              <div className="bg-cream-light dark:bg-darkCard p-8 rounded-[40px] border border-cream dark:border-darkBg-light shadow-md space-y-6">
                <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark border-b border-cream dark:border-darkBg-light pb-3">
                  Summary Items
                </h3>
                <div className="max-h-60 overflow-y-auto space-y-3 pr-2">
                  {cart.map(item => (
                    <div key={item.id || item._id} className="flex justify-between items-center text-xs">
                      <div className="flex items-center space-x-2">
                        <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
                        <div>
                          <span className="font-bold block text-textColor-light dark:text-textColor-dark line-clamp-1">{item.name}</span>
                          <span className="text-[10px] text-textColor-light/60">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-textColor-light dark:text-textColor-dark">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-cream dark:border-darkBg-light pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-textColor-light/75">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-textColor-light/75">
                    <span>Delivery</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between font-black text-sm text-textColor-light dark:text-textColor-dark border-t border-cream dark:border-darkBg-light pt-2">
                    <span>Total Amount</span>
                    <span className="text-base text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: ORDER CONFIRMED SCREEN */}
          {step === 3 && confirmedOrder && (
            <div className="max-w-xl mx-auto bg-cream-light dark:bg-darkCard p-8 rounded-[40px] border border-cream dark:border-darkBg-light shadow-lg text-center space-y-6 animate-fade-in">
              <div className="w-16 h-16 bg-green-500/10 text-green-500 mx-auto rounded-full flex items-center justify-center shadow-inner">
                <CheckCircle size={36} />
              </div>
              <div>
                <h1 className="text-3xl font-black text-textColor-light dark:text-textColor-dark">
                  Order Confirmed!
                </h1>
                <p className="text-xs text-textColor-light/75 dark:text-textColor-dark/75 mt-1">
                  Thank you for your order. We are preparing your fresh treats right now!
                </p>
              </div>

              {/* Tracking code helper */}
              <div className="bg-cream dark:bg-darkBg p-4 rounded-3xl border border-cream-dark/20 dark:border-darkBg-light space-y-2 text-left">
                <span className="text-[10px] font-bold text-textColor-light/60 uppercase block">Tracking Code</span>
                <div className="flex items-center justify-between bg-cream-light dark:bg-darkCard px-3 py-2.5 rounded-xl border border-cream-dark/15 dark:border-darkBg-light">
                  <span className="font-mono font-black text-sm tracking-wider text-primary dark:text-secondary">
                    {confirmedOrder.trackingCode}
                  </span>
                  <button
                    onClick={() => handleCopyCode(confirmedOrder.trackingCode)}
                    className="text-primary hover:text-primary-dark p-1 cursor-pointer"
                    title="Copy Tracking ID"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <p className="text-[9px] text-textColor-light/50 dark:text-textColor-dark/50 leading-relaxed pt-1">
                  Use this tracking code under the "Track Order" tab at the top of the page to check the progress of your donuts in real-time.
                </p>
              </div>

              <div className="border-t border-cream dark:border-darkBg-light pt-6 grid grid-cols-2 gap-4 text-xs font-bold">
                <button
                  onClick={() => { setStep(1); setActiveTab('checkout'); setConfirmedOrder(null); }}
                  className="bg-cream dark:bg-darkBg border border-cream-dark/20 dark:border-darkBg-light text-textColor-light dark:text-textColor-dark py-3 rounded-full hover:bg-cream-dark transition-colors"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => {
                    setTrackCode(confirmedOrder.trackingCode);
                    setActiveTab('tracking');
                    setStep(1);
                    // Fetch details
                    setTrackedOrder(confirmedOrder);
                    setConfirmedOrder(null);
                  }}
                  className="bg-primary hover:bg-primary-dark text-white py-3 rounded-full shadow transition-colors"
                >
                  Track Live Status
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* TAB 2: ORDER STATUS TRACKER SEARCH AND DISPLAY */
        <div className="max-w-2xl mx-auto space-y-8">
          
          <div className="text-center max-w-md mx-auto space-y-2">
            <h2 className="text-2xl font-black text-textColor-light dark:text-textColor-dark">
              Track Your Donuts Live
            </h2>
            <p className="text-xs text-textColor-light/75 dark:text-textColor-dark/75">
              Enter your unique tracking code below to watch your donuts move from the baker's table to your doorstep.
            </p>
          </div>

          {/* Code Search Input Form */}
          <form onSubmit={handleTrackOrder} className="flex max-w-md mx-auto">
            <input
              type="text"
              placeholder="e.g. DONUT-123456"
              required
              value={trackCode}
              onChange={(e) => setTrackCode(e.target.value)}
              className="w-full px-5 py-3 rounded-l-full bg-cream-light dark:bg-darkCard text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light focus:outline-none focus:ring-2 focus:ring-primary text-sm font-bold uppercase tracking-wider"
            />
            <button
              type="submit"
              disabled={trackingLoading}
              className="bg-primary hover:bg-primary-dark text-white px-6 rounded-r-full font-bold flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              {trackingLoading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Search size={18} />}
            </button>
          </form>

          {trackingError && (
            <p className="text-center text-xs text-red-500 font-semibold">{trackingError}</p>
          )}

          {/* Tracked Order Details Card Display */}
          {trackedOrder && (
            <div className="bg-cream-light dark:bg-darkCard p-8 rounded-[40px] border border-cream dark:border-darkBg-light shadow-md space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-cream dark:border-darkBg-light pb-4 gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase text-textColor-light/50 dark:text-textColor-dark/50">Tracking Order</span>
                  <h4 className="font-mono font-black text-primary dark:text-secondary tracking-wider text-base">{trackedOrder.trackingCode}</h4>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-black uppercase text-textColor-light/50 dark:text-textColor-dark/50">Status State</span>
                  <span className="block text-xs font-black bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider mt-0.5">
                    {trackedOrder.status}
                  </span>
                </div>
              </div>

              {/* Graphical Step-by-Step Progress Bar Timeline */}
              <div className="grid grid-cols-4 relative">
                
                {/* Horizontal line */}
                <div className="absolute top-4 left-[12.5%] right-[12.5%] h-1 bg-cream-dark dark:bg-darkBg-light -z-10" />

                {/* Progress values */}
                {[
                  { key: 'Received', label: 'Order Received', time: 'Step 1' },
                  { key: 'Preparing', label: 'Baking & Glazing', time: 'Step 2' },
                  { key: 'Out for Delivery', label: 'On Its Way', time: 'Step 3' },
                  { key: 'Delivered', label: 'Deliciously Delivered', time: 'Step 4' }
                ].map((s, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center space-y-2">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 z-10 ${
                      getStatusStepClass(trackedOrder.status, s.key)
                    }`}>
                      {idx + 1}
                    </div>
                    <span className="text-[10px] font-extrabold text-textColor-light dark:text-textColor-dark tracking-wide line-clamp-1 max-w-[80px] sm:max-w-none">
                      {s.label}
                    </span>
                    <span className="text-[8px] text-textColor-light/40 dark:text-textColor-dark/40 uppercase">
                      {s.time}
                    </span>
                  </div>
                ))}
              </div>

              {/* Order summaries items & delivery details */}
              <div className="border-t border-cream dark:border-darkBg-light pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-textColor-light/80 dark:text-textColor-dark/80">
                <div className="space-y-2">
                  <h4 className="font-extrabold text-sm text-textColor-light dark:text-textColor-dark uppercase tracking-wide">Shipment details</h4>
                  <p><span className="font-bold">Customer Name:</span> {trackedOrder.deliveryDetails.name}</p>
                  <p><span className="font-bold">Phone Number:</span> {trackedOrder.deliveryDetails.phone}</p>
                  <p><span className="font-bold">Address:</span> {trackedOrder.deliveryDetails.address}</p>
                  <p><span className="font-bold">Shipping Method:</span> <span className="capitalize">{trackedOrder.deliveryMethod}</span></p>
                  {trackedOrder.deliveryDetails.notes && <p><span className="font-bold">Dietary Notes:</span> {trackedOrder.deliveryDetails.notes}</p>}
                </div>
                <div className="space-y-3 bg-cream dark:bg-darkBg p-4 rounded-3xl border border-cream-dark/15 dark:border-darkBg-light">
                  <h4 className="font-extrabold text-sm text-textColor-light dark:text-textColor-dark uppercase tracking-wide">Items Checked</h4>
                  <div className="max-h-24 overflow-y-auto space-y-1 text-[11px] pr-2">
                    {trackedOrder.items.map((it, i) => (
                      <div key={i} className="flex justify-between">
                        <span>{it.name} (x{it.quantity})</span>
                        <span className="font-semibold">${(it.price * it.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-cream-dark/25 dark:border-darkBg-light pt-2 flex justify-between font-black text-textColor-light dark:text-textColor-dark">
                    <span>Total Bill:</span>
                    <span className="text-primary">${trackedOrder.finalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default Ordering;
