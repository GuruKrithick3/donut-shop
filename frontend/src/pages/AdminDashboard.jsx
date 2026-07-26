import React, { useState, useEffect } from 'react';
import { useAuth, API_BASE } from '../context/AuthContext.jsx';
import DashboardCharts from '../components/DashboardCharts.jsx';
import {
  Plus,
  Trash2,
  Edit2,
  DollarSign,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  Tag,
  Star,
  CheckCircle,
  Truck,
  TrendingUp,
  X,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  
  // Dashboard Sub-sections tabs: 'overview', 'products', 'orders', 'coupons', 'customers', 'reviews'
  const [adminTab, setAdminTab] = useState('overview');

  // Stats Counters
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProductsCount, setTotalProductsCount] = useState(0);

  // Data states
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [reviews, setReviews] = useState([]);

  // Loaders
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Dialog State: Product Form modal
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // null means adding a new product
  
  const [prodName, setProdName] = useState('');
  const [prodCategory, setProdCategory] = useState('Classic Donuts');
  const [prodDesc, setProdDesc] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [prodBestSeller, setProdBestSeller] = useState(false);
  const [prodInStock, setProdInStock] = useState(true);

  // Dialog State: Coupon Form
  const [couponFormOpen, setCouponFormOpen] = useState(false);
  const [coupCode, setCoupCode] = useState('');
  const [coupType, setCoupType] = useState('percentage');
  const [coupVal, setCoupVal] = useState('');
  const [coupMin, setCoupMin] = useState('0');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const headers = { 'Authorization': `Bearer ${user.token}` };

      // 1. Fetch Products
      const prodRes = await fetch(`${API_BASE}/products`);
      const prodData = await prodRes.json();
      if (prodRes.ok) {
        setProducts(prodData);
        setTotalProductsCount(prodData.length);
      }

      // 2. Fetch Orders
      const ordRes = await fetch(`${API_BASE}/orders`, { headers });
      const ordData = await ordRes.json();
      if (ordRes.ok) {
        setOrders(ordData);
        setTotalOrders(ordData.length);
        const rev = ordData.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.finalAmount : 0), 0);
        setTotalRevenue(rev);
      }

      // 3. Fetch Coupons
      const coupRes = await fetch(`${API_BASE}/coupons`, { headers });
      const coupData = await coupRes.json();
      if (coupRes.ok) setCoupons(coupData);

      // 4. Fetch Customers
      const custRes = await fetch(`${API_BASE}/auth/users`, { headers });
      const custData = await custRes.json();
      if (custRes.ok) {
        setCustomers(custData);
        setTotalUsers(custData.length);
      }

      // 5. Fetch Reviews
      const revRes = await fetch(`${API_BASE}/reviews`);
      const revData = await revRes.json();
      if (revRes.ok) setReviews(revData);

    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to sync admin data models.');
    } finally {
      setLoading(false);
    }
  };

  // PRODUCT CRUD TRIGGERS
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProdName('');
    setProdCategory('Classic Donuts');
    setProdDesc('');
    setProdPrice('');
    setProdImage('');
    setProdBestSeller(false);
    setProdInStock(true);
    setProductFormOpen(true);
  };

  const openEditProductModal = (product) => {
    setEditingProduct(product);
    setProdName(product.name);
    setProdCategory(product.category);
    setProdDesc(product.description);
    setProdPrice(product.price.toString());
    setProdImage(product.image);
    setProdBestSeller(product.isBestSeller);
    setProdInStock(product.inStock);
    setProductFormOpen(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!prodName || !prodPrice) {
      alert('Product name and price are required.');
      return;
    }

    const payload = {
      name: prodName,
      category: prodCategory,
      description: prodDesc,
      price: Number(prodPrice),
      image: prodImage || 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80',
      isBestSeller: prodBestSeller,
      inStock: prodInStock
    };

    try {
      const url = editingProduct
        ? `${API_BASE}/products/${editingProduct.id || editingProduct._id}`
        : `${API_BASE}/products`;
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setProductFormOpen(false);
        fetchDashboardData();
      } else {
        const err = await res.json();
        alert(err.message || 'Operation failed');
      }
    } catch (err) {
      alert('Error updating catalog.');
    }
  };

  const handleDeleteProduct = async (prodId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`${API_BASE}/products/${prodId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      if (res.ok) {
        fetchDashboardData();
      } else {
        alert('Could not delete product');
      }
    } catch (err) {
      alert('Network error deleting product.');
    }
  };

  // ORDER QUEUE STATUS MODIFIER
  const handleUpdateOrderStatus = async (orderId, newStatus, newPayment = null) => {
    try {
      const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          status: newStatus,
          paymentStatus: newPayment
        })
      });
      if (res.ok) {
        fetchDashboardData();
      } else {
        alert('Failed to update status');
      }
    } catch (err) {
      alert('Network error.');
    }
  };

  // COUPON CODE ADD & DELETE
  const handleAddCoupon = async (e) => {
    e.preventDefault();
    if (!coupCode || !coupVal) {
      alert('Coupon code and discount rate are required.');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/coupons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          code: coupCode.toUpperCase(),
          discountType: coupType,
          discountValue: Number(coupVal),
          minCartAmount: Number(coupMin || 0)
        })
      });

      if (res.ok) {
        setCouponFormOpen(false);
        setCoupCode('');
        setCoupVal('');
        setCoupMin('0');
        fetchDashboardData();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to create coupon');
      }
    } catch (err) {
      alert('Error creating coupon.');
    }
  };

  const handleDeleteCoupon = async (couponId) => {
    if (!window.confirm('Delete this coupon code?')) return;
    try {
      const res = await fetch(`${API_BASE}/coupons/${couponId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      if (res.ok) {
        fetchDashboardData();
      } else {
        alert('Could not delete coupon');
      }
    } catch (err) {
      alert('Network error deleting coupon.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      
      {/* Welcome Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-cream dark:border-darkBg-light pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-black text-textColor-light dark:text-textColor-dark tracking-tight">
            Admin Dashboard
          </h1>
          <p className="text-xs text-textColor-light/65 dark:text-textColor-dark/65 mt-1">
            Manage your shop products, track incoming order queues, configure discounts, and view revenue analytics.
          </p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="bg-cream dark:bg-darkCard hover:bg-cream-dark text-textColor-light dark:text-textColor-dark text-xs font-bold border border-cream-dark/20 dark:border-darkBg-light px-5 py-2.5 rounded-full transition-colors"
        >
          Refresh Data Models
        </button>
      </div>

      {/* Tabs list */}
      <div className="flex space-x-2 overflow-x-auto py-2 no-scrollbar border-b border-cream dark:border-darkBg-light pb-6">
        {[
          { key: 'overview', name: 'Overview' },
          { key: 'products', name: 'Products Catalog' },
          { key: 'orders', name: 'Order Queue' },
          { key: 'coupons', name: 'Discounts / Coupons' },
          { key: 'customers', name: 'Customers Database' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setAdminTab(tab.key)}
            className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
              adminTab === tab.key
                ? 'bg-primary text-white shadow'
                : 'bg-cream-light dark:bg-darkCard text-textColor-light dark:text-textColor-dark border border-cream-dark/30 dark:border-darkBg-light hover:bg-cream-dark dark:hover:bg-darkBg-light'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {errorMsg && (
        <div className="bg-red-500/10 text-red-600 p-4 rounded-2xl text-xs font-semibold flex items-center space-x-2">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="donut-spinner"></div>
        </div>
      ) : (
        /* TAB RENDER PANEL */
        <div className="space-y-12">
          
          {/* TAB: OVERVIEW */}
          {adminTab === 'overview' && (
            <div className="space-y-12 animate-fade-in">
              {/* Stats Grid Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                
                <div className="bg-cream-light dark:bg-darkCard p-6 rounded-3xl border border-cream dark:border-darkBg-light shadow-sm flex items-center justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-textColor-light/60 dark:text-textColor-dark/60 tracking-wider">Total Orders</span>
                    <h3 className="text-3xl font-black text-textColor-light dark:text-textColor-dark">{totalOrders}</h3>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary"><ShoppingBag size={24} /></div>
                </div>

                <div className="bg-cream-light dark:bg-darkCard p-6 rounded-3xl border border-cream dark:border-darkBg-light shadow-sm flex items-center justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-textColor-light/60 dark:text-textColor-dark/60 tracking-wider">Total Revenue</span>
                    <h3 className="text-3xl font-black text-textColor-light dark:text-textColor-dark">${totalRevenue.toFixed(2)}</h3>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded-2xl text-green-500"><DollarSign size={24} /></div>
                </div>

                <div className="bg-cream-light dark:bg-darkCard p-6 rounded-3xl border border-cream dark:border-darkBg-light shadow-sm flex items-center justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-textColor-light/60 dark:text-textColor-dark/60 tracking-wider">Customers</span>
                    <h3 className="text-3xl font-black text-textColor-light dark:text-textColor-dark">{totalUsers}</h3>
                  </div>
                  <div className="p-4 bg-blue-500/10 rounded-2xl text-blue-500"><Users size={24} /></div>
                </div>

                <div className="bg-cream-light dark:bg-darkCard p-6 rounded-3xl border border-cream dark:border-darkBg-light shadow-sm flex items-center justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-textColor-light/60 dark:text-textColor-dark/60 tracking-wider">Menu Items</span>
                    <h3 className="text-3xl font-black text-textColor-light dark:text-textColor-dark">{totalProductsCount}</h3>
                  </div>
                  <div className="p-4 bg-yellow-500/10 rounded-2xl text-yellow-500"><UtensilsCrossed size={24} /></div>
                </div>

              </div>

              {/* Custom SVG Charts Panel */}
              <DashboardCharts />
            </div>
          )}

          {/* TAB: PRODUCTS CATALOG (CRUD) */}
          {adminTab === 'products' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark">Products Catalog ({products.length})</h3>
                <button
                  onClick={openAddProductModal}
                  className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2.5 rounded-full shadow flex items-center space-x-1 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Add New Product</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-cream-light dark:bg-darkCard rounded-3xl border border-cream dark:border-darkBg-light shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-cream dark:bg-darkBg text-textColor-light/60 dark:text-textColor-dark/65 font-bold uppercase border-b border-cream-dark/15 dark:border-darkBg-light">
                        <th className="p-4">Item Details</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-dark/10 dark:divide-darkBg-light">
                      {products.map(p => (
                        <tr key={p.id || p._id} className="hover:bg-cream/25 dark:hover:bg-darkBg/15">
                          <td className="p-4 flex items-center space-x-3">
                            <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-xl shrink-0" />
                            <div>
                              <span className="font-bold text-textColor-light dark:text-textColor-dark block">{p.name}</span>
                              <span className="text-[10px] text-textColor-light/50 dark:text-textColor-dark/50 block line-clamp-1 max-w-[200px]">{p.description}</span>
                            </div>
                          </td>
                          <td className="p-4 text-textColor-light/75 dark:text-textColor-dark/75">{p.category}</td>
                          <td className="p-4 font-black text-textColor-light dark:text-textColor-dark">${p.price.toFixed(2)}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                              p.inStock
                                ? 'bg-green-500/10 text-green-500'
                                : 'bg-red-500/10 text-red-500'
                            }`}>
                              {p.inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center space-x-3">
                              <button onClick={() => openEditProductModal(p)} className="text-blue-500 hover:text-blue-700 p-1"><Edit2 size={14} /></button>
                              <button onClick={() => handleDeleteProduct(p.id || p._id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ORDERS QUEUE */}
          {adminTab === 'orders' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark">Incoming Orders Queue ({orders.length})</h3>

              <div className="bg-cream-light dark:bg-darkCard rounded-3xl border border-cream dark:border-darkBg-light shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-cream dark:bg-darkBg text-textColor-light/60 dark:text-textColor-dark/65 font-bold uppercase border-b border-cream-dark/15 dark:border-darkBg-light">
                        <th className="p-4">Order Code</th>
                        <th className="p-4">Customer Details</th>
                        <th className="p-4">Final Amount</th>
                        <th className="p-4">Delivery</th>
                        <th className="p-4">Payment</th>
                        <th className="p-4">Status State</th>
                        <th className="p-4 text-center">Manage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-dark/10 dark:divide-darkBg-light">
                      {orders.map(o => (
                        <tr key={o.id || o._id} className="hover:bg-cream/25 dark:hover:bg-darkBg/15">
                          <td className="p-4 font-mono font-black text-primary dark:text-secondary">{o.trackingCode}</td>
                          <td className="p-4">
                            <span className="font-bold text-textColor-light dark:text-textColor-dark block">{o.deliveryDetails.name}</span>
                            <span className="text-[10px] text-textColor-light/50 dark:text-textColor-dark/50 block">{o.deliveryDetails.phone}</span>
                          </td>
                          <td className="p-4 font-black text-textColor-light dark:text-textColor-dark">${o.finalAmount.toFixed(2)}</td>
                          <td className="p-4 text-textColor-light/75 dark:text-textColor-dark/75 capitalize">{o.deliveryMethod}</td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                              o.paymentStatus === 'Paid'
                                ? 'bg-green-500/10 text-green-500'
                                : 'bg-yellow-500/10 text-yellow-500'
                            }`}>
                              {o.paymentStatus}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                              o.status === 'Delivered'
                                ? 'bg-green-500/10 text-green-500'
                                : o.status === 'Out for Delivery'
                                ? 'bg-blue-500/10 text-blue-500'
                                : o.status === 'Preparing'
                                ? 'bg-orange-500/10 text-orange-500'
                                : 'bg-gray-500/10 text-gray-500'
                            }`}>
                              {o.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center space-x-2">
                              {o.status !== 'Delivered' && (
                                <button
                                  onClick={() => {
                                    const nextStatus = o.status === 'Received' ? 'Preparing' : o.status === 'Preparing' ? 'Out for Delivery' : 'Delivered';
                                    handleUpdateOrderStatus(o.id || o._id, nextStatus, 'Paid');
                                  }}
                                  className="bg-primary hover:bg-primary-dark text-white font-bold text-[10px] px-2.5 py-1.5 rounded-full tracking-wide shadow-sm"
                                >
                                  Next Step
                                </button>
                              )}
                              {o.paymentStatus !== 'Paid' && (
                                <button
                                  onClick={() => handleUpdateOrderStatus(o.id || o._id, o.status, 'Paid')}
                                  className="bg-green-500 hover:bg-green-600 text-white font-bold text-[10px] px-2.5 py-1.5 rounded-full tracking-wide shadow-sm"
                                >
                                  Mark Paid
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB: COUPONS */}
          {adminTab === 'coupons' && (
            <div className="space-y-6 animate-fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark">Store Promo Codes ({coupons.length})</h3>
                <button
                  onClick={() => setCouponFormOpen(true)}
                  className="bg-primary hover:bg-primary-dark text-white text-xs font-bold px-4 py-2.5 rounded-full shadow flex items-center space-x-1 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Create Coupon</span>
                </button>
              </div>

              {/* Add Coupon Modal */}
              {couponFormOpen && (
                <div className="fixed inset-0 bg-darkBg/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <form onSubmit={handleAddCoupon} className="bg-cream-light dark:bg-darkCard p-8 rounded-[40px] border border-cream dark:border-darkBg-light shadow-xl max-w-sm w-full space-y-4 relative animate-fade-in">
                    <button type="button" onClick={() => setCouponFormOpen(false)} className="absolute top-4 right-4 text-textColor-light/50"><X size={18} /></button>
                    <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark mb-4">Create Promo Code</h3>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-textColor-light/60">Promo Code</label>
                      <input type="text" required value={coupCode} onChange={(e) => setCoupCode(e.target.value)} placeholder="e.g. SWEET50" className="w-full px-4 py-2 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/30 dark:border-darkBg-light rounded-xl focus:outline-none text-xs font-bold uppercase" />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-textColor-light/60">Type</label>
                        <select value={coupType} onChange={(e) => setCoupType(e.target.value)} className="w-full px-4 py-2 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/30 dark:border-darkBg-light rounded-xl focus:outline-none text-xs font-bold">
                          <option value="percentage">Percentage (%)</option>
                          <option value="fixed">Fixed Cash ($)</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold uppercase text-textColor-light/60">Discount Value</label>
                        <input type="number" required value={coupVal} onChange={(e) => setCoupVal(e.target.value)} placeholder="15" className="w-full px-4 py-2 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/30 dark:border-darkBg-light rounded-xl focus:outline-none text-xs font-bold" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase text-textColor-light/60">Min Cart Subtotal ($)</label>
                      <input type="number" value={coupMin} onChange={(e) => setCoupMin(e.target.value)} placeholder="20" className="w-full px-4 py-2 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/30 dark:border-darkBg-light rounded-xl focus:outline-none text-xs font-bold" />
                    </div>
                    <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-full font-bold shadow text-xs mt-4">Save Coupon</button>
                  </form>
                </div>
              )}

              {/* Coupons List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {coupons.map(c => (
                  <div key={c.id || c._id} className="bg-cream-light dark:bg-darkCard p-6 rounded-3xl border border-cream dark:border-darkBg-light shadow-sm flex justify-between items-center">
                    <div>
                      <span className="font-mono font-black text-primary dark:text-secondary text-base block">{c.code}</span>
                      <span className="text-[10px] text-textColor-light/60 dark:text-textColor-dark/60 font-semibold uppercase block mt-1">
                        Discount: {c.discountType === 'percentage' ? `${c.discountValue}% Off` : `$${c.discountValue} Off`}
                      </span>
                      <span className="text-[9px] text-textColor-light/50 dark:text-textColor-dark/50 block font-medium">
                        Min Cart requirement: ${c.minCartAmount}
                      </span>
                    </div>
                    <button onClick={() => handleDeleteCoupon(c.id || c._id)} className="text-red-500 hover:text-red-700 p-2"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CUSTOMERS */}
          {adminTab === 'customers' && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark">Registered Customer Database ({customers.length})</h3>

              <div className="bg-cream-light dark:bg-darkCard rounded-3xl border border-cream dark:border-darkBg-light shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-cream dark:bg-darkBg text-textColor-light/60 dark:text-textColor-dark/65 font-bold uppercase border-b border-cream-dark/15 dark:border-darkBg-light">
                        <th className="p-4">Customer Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Referral Code</th>
                        <th className="p-4">Loyalty Balance</th>
                        <th className="p-4">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cream-dark/10 dark:divide-darkBg-light">
                      {customers.map(c => (
                        <tr key={c.id || c._id} className="hover:bg-cream/25 dark:hover:bg-darkBg/15">
                          <td className="p-4 font-bold text-textColor-light dark:text-textColor-dark">{c.name}</td>
                          <td className="p-4 text-textColor-light/75 dark:text-textColor-dark/75">{c.email}</td>
                          <td className="p-4 font-mono font-bold text-textColor-light/60 dark:text-textColor-dark/60">{c.referralCode || 'N/A'}</td>
                          <td className="p-4 font-black text-primary dark:text-secondary">{c.loyaltyPoints} points</td>
                          <td className="p-4 text-textColor-light/60 dark:text-textColor-dark/60">{new Date(c.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

      {/* PRODUCT FORM POPUP DIALOG */}
      {productFormOpen && (
        <div className="fixed inset-0 bg-darkBg/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleProductSubmit} className="bg-cream-light dark:bg-darkCard p-8 rounded-[40px] border border-cream dark:border-darkBg-light shadow-xl max-w-md w-full space-y-4 relative animate-fade-in">
            <button type="button" onClick={() => setProductFormOpen(false)} className="absolute top-4 right-4 text-textColor-light/50"><X size={18} /></button>
            <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark mb-4">
              {editingProduct ? 'Modify Menu Product' : 'Add New Menu Product'}
            </h3>
            
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-textColor-light/60">Product Name</label>
              <input type="text" required value={prodName} onChange={(e) => setProdName(e.target.value)} placeholder="Strawberry Sprinkles" className="w-full px-4 py-2 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/30 dark:border-darkBg-light rounded-xl focus:outline-none text-xs font-semibold" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-textColor-light/60">Category</label>
                <select value={prodCategory} onChange={(e) => setProdCategory(e.target.value)} className="w-full px-4 py-2 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/30 dark:border-darkBg-light rounded-xl focus:outline-none text-xs font-semibold">
                  <option value="Classic Donuts">Classic Donuts</option>
                  <option value="Premium Donuts">Premium Donuts</option>
                  <option value="Filled Donuts">Filled Donuts</option>
                  <option value="Mini Donuts">Mini Donuts</option>
                  <option value="Coffee and Drinks">Coffee & Drinks</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase text-textColor-light/60">Price ($)</label>
                <input type="number" step="0.01" required value={prodPrice} onChange={(e) => setProdPrice(e.target.value)} placeholder="2.99" className="w-full px-4 py-2 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/30 dark:border-darkBg-light rounded-xl focus:outline-none text-xs font-semibold" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-textColor-light/60">Description</label>
              <textarea rows="2" value={prodDesc} onChange={(e) => setProdDesc(e.target.value)} placeholder="Brief product summary..." className="w-full px-4 py-2 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/30 dark:border-darkBg-light rounded-xl focus:outline-none text-xs font-semibold" />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase text-textColor-light/60">Image URL</label>
              <input type="text" value={prodImage} onChange={(e) => setProdImage(e.target.value)} placeholder="https://unsplash.com/..." className="w-full px-4 py-2 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/30 dark:border-darkBg-light rounded-xl focus:outline-none text-xs font-semibold" />
            </div>

            <div className="flex items-center space-x-6 pt-2">
              <label className="flex items-center space-x-2 text-xs font-bold text-textColor-light/75 dark:text-textColor-dark/75 cursor-pointer">
                <input type="checkbox" checked={prodBestSeller} onChange={(e) => setProdBestSeller(e.target.checked)} className="rounded text-primary focus:ring-primary w-4 h-4" />
                <span>Best Seller</span>
              </label>
              <label className="flex items-center space-x-2 text-xs font-bold text-textColor-light/75 dark:text-textColor-dark/75 cursor-pointer">
                <input type="checkbox" checked={prodInStock} onChange={(e) => setProdInStock(e.target.checked)} className="rounded text-primary focus:ring-primary w-4 h-4" />
                <span>In Stock</span>
              </label>
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-full font-bold shadow text-xs mt-4">
              {editingProduct ? 'Save Product Details' : 'Add Product to Catalog'}
            </button>
          </form>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
