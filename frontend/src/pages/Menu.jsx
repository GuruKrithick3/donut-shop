import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { API_BASE } from '../context/AuthContext.jsx';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Classic Donuts',
    'Premium Donuts',
    'Filled Donuts',
    'Mini Donuts',
    'Coffee and Drinks'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE}/products`);
        const data = await res.json();
        if (res.ok) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Error fetching menu catalog:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter products by search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      
      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-primary dark:text-secondary flex items-center justify-center space-x-1">
          <Sparkles size={14} />
          <span>Our Menu</span>
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-textColor-light dark:text-textColor-dark leading-none">
          Fresh, Sweet & Delicious
        </h1>
        <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80">
          Handcrafted daily with premium glazes and locally roasted beans. Choose from our classic doughs or luxury filled varieties!
        </p>
      </div>

      {/* Search & Filters Controls */}
      <div className="bg-cream-light dark:bg-darkCard rounded-3xl p-6 border border-cream dark:border-darkBg-light shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search our delicious flavors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark dark:border-darkBg-light focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm font-medium transition-all"
          />
          <Search className="absolute left-4 top-3.5 text-textColor-light/50 dark:text-textColor-dark/50" size={18} />
        </div>

        {/* Categories Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto py-2 no-scrollbar scroll-smooth">
          <SlidersHorizontal size={16} className="text-textColor-light/50 dark:text-textColor-dark/50 shrink-0 hidden sm:block mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark hover:bg-cream-dark dark:hover:bg-darkBg-light border border-cream-dark/30 dark:border-darkBg-light'
              }`}
            >
              {cat.split(' ')[0]} {/* Shorten name for responsive sizing */}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="donut-spinner"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-cream-light dark:bg-darkCard rounded-[40px] border border-cream dark:border-darkBg-light max-w-3xl mx-auto">
          <span className="text-5xl">🍩</span>
          <h3 className="text-xl font-bold text-textColor-light dark:text-textColor-dark mt-4">
            No Sweet Treats Found
          </h3>
          <p className="text-xs text-textColor-light/75 dark:text-textColor-dark/75 mt-2">
            We couldn't find any donuts or drinks matching your current search parameters. Try resetting your filters!
          </p>
          <button
            onClick={() => { setSearchTerm(''); setActiveCategory('All'); }}
            className="mt-6 bg-accent text-white px-6 py-2.5 rounded-full font-bold text-xs shadow hover:bg-accent-light transition-all"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Menu;
