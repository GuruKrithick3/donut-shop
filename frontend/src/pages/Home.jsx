import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import { API_BASE } from '../context/AuthContext.jsx';
import { Coffee, Flame, ShieldAlert, Award, Star, Truck, AwardIcon, Sparkles } from 'lucide-react';

const Home = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const prodRes = await fetch(`${API_BASE}/products`);
        const prodData = await prodRes.json();
        if (prodRes.ok) {
          const sellers = prodData.filter(p => p.isBestSeller).slice(0, 6);
          setBestSellers(sellers);
        }

        // Fetch testimonials
        const revRes = await fetch(`${API_BASE}/reviews`);
        const revData = await revRes.json();
        if (revRes.ok) {
          setReviews(revData.slice(0, 6));
        }
      } catch (err) {
        console.error('Error fetching homepage data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const features = [
    { icon: <Sparkles className="text-primary" size={28} />, title: 'Fresh Ingredients', desc: 'We source organic, local farm ingredients daily.' },
    { icon: <Flame className="text-secondary" size={28} />, title: 'Daily Baking', desc: 'Baked fresh from scratch starting at 3:00 AM every morning.' },
    { icon: <Truck className="text-accent" size={28} />, title: 'Fast Delivery', desc: 'Hot, fluffy donuts delivered straight to your door.' },
    { icon: <Award className="text-primary" size={28} />, title: 'Premium Quality', desc: 'Artisanal recipes perfected over a decade of baking.' }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream to-primary/10 dark:from-darkBg-dark dark:to-primary/5 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Hero Copy */}
          <div className="space-y-6 md:space-y-8 text-center md:text-left">
            <span className="inline-flex items-center space-x-2 bg-primary/15 text-primary dark:bg-secondary/15 dark:text-secondary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              <span>🍩 Fresh & Hot</span>
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none text-textColor-light dark:text-textColor-dark">
              Freshly Made <br/>
              <span className="text-primary dark:text-secondary">Donuts</span> Every Day
            </h1>
            <p className="text-base sm:text-lg text-textColor-light/80 dark:text-textColor-dark/80 max-w-lg mx-auto md:mx-0">
              Delicious handcrafted donuts baked fresh every morning. Indulge in our signature glazes and specialty toppings paired with a fresh coffee.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link
                to="/menu"
                className="w-full sm:w-auto text-center bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Order Now
              </Link>
              <Link
                to="/menu"
                className="w-full sm:w-auto text-center border-2 border-accent text-accent hover:bg-accent hover:text-white dark:border-secondary dark:text-secondary dark:hover:bg-secondary dark:hover:text-darkBg px-8 py-4 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-0.5"
              >
                View Menu
              </Link>
            </div>
          </div>

          {/* Hero Graphics */}
          <div className="relative flex justify-center items-center">
            {/* Background blob */}
            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-primary/20 dark:bg-secondary/10 rounded-full filter blur-3xl -z-10 animate-pulse"></div>
            <img
              src="https://images.unsplash.com/photo-1514517604298-cf80e0fb7f1e?auto=format&fit=crop&w=800&q=80"
              alt="Assorted Donuts Display"
              className="w-full max-w-md h-auto object-cover rounded-3xl shadow-2xl border-4 border-white dark:border-darkCard animate-spin-slow"
              style={{ animationDuration: '60s' }}
            />
          </div>
        </div>
      </section>

      {/* 2. Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-textColor-light dark:text-textColor-dark mb-4">
            Why Choose DONUTS?
          </h2>
          <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80">
            We pour love and premium ingredients into every recipe to bring you the fluffiest, tastiest experience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, i) => (
            <div
              key={i}
              className="bg-cream-light dark:bg-darkCard p-8 rounded-3xl border border-cream dark:border-darkBg-light text-center space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="inline-flex p-4 rounded-2xl bg-cream dark:bg-darkBg shadow-sm">
                {feat.icon}
              </div>
              <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark">
                {feat.title}
              </h3>
              <p className="text-xs text-textColor-light/75 dark:text-textColor-dark/75 leading-relaxed">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-textColor-light dark:text-textColor-dark mb-2">
              Our Best Sellers
            </h2>
            <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80">
              Tried, tested, and absolute fan favorites. Grab them before they sell out!
            </p>
          </div>
          <Link
            to="/menu"
            className="mt-4 sm:mt-0 text-sm font-bold text-primary dark:text-secondary hover:underline flex items-center space-x-1"
          >
            <span>View Full Menu</span>
            <span>&rarr;</span>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="donut-spinner"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bestSellers.map(product => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Testimonials Section */}
      <section className="bg-cream-dark/50 dark:bg-darkBg-dark/30 py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-textColor-light dark:text-textColor-dark mb-4">
              What Our Customers Say
            </h2>
            <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80">
              We have served thousands of happy students, families, and dessert lovers. Here is their honest feedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev) => (
              <div
                key={rev.id || rev._id}
                className="bg-cream-light dark:bg-darkCard p-8 rounded-3xl border border-cream dark:border-darkBg-light shadow-sm flex flex-col justify-between"
              >
                <p className="text-xs italic text-textColor-light/95 dark:text-textColor-dark/95 leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
                <div className="flex items-center justify-between border-t border-cream dark:border-darkBg-light pt-4">
                  <div>
                    <h4 className="font-bold text-sm text-textColor-light dark:text-textColor-dark">
                      {rev.name}
                    </h4>
                    <span className="text-[10px] text-textColor-light/60 dark:text-textColor-dark/60">
                      Verified Customer
                    </span>
                  </div>
                  <div className="flex space-x-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Gallery Section Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-textColor-light dark:text-textColor-dark mb-4">
            Follow The Sweetness
          </h2>
          <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80 mb-4">
            A look behind our counters, inside our kitchens, and at our gorgeous donut creations.
          </p>
          <Link
            to="/gallery"
            className="text-sm font-bold text-primary dark:text-secondary hover:underline"
          >
            Open Full Gallery &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-64 rounded-3xl overflow-hidden shadow">
            <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80" alt="Chocolate donut details" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="h-64 rounded-3xl overflow-hidden shadow">
            <img src="https://images.unsplash.com/photo-1612240498936-65f5101365d2?auto=format&fit=crop&w=400&q=80" alt="Strawberry sprinkles donut details" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="h-64 rounded-3xl overflow-hidden shadow">
            <img src="https://images.unsplash.com/photo-1527515648294-f904791a8409?auto=format&fit=crop&w=400&q=80" alt="White vanilla glaze donut details" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="h-64 rounded-3xl overflow-hidden shadow">
            <img src="https://images.unsplash.com/photo-1533930027521-1378bf94156a?auto=format&fit=crop&w=400&q=80" alt="Salted caramel glazed details" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      </section>

      {/* 6. Loyalty Reward Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-primary to-accent dark:from-primary-dark dark:to-accent-dark rounded-[40px] p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full filter blur-3xl pointer-events-none"></div>
          <div className="space-y-4 text-center md:text-left max-w-xl">
            <h3 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Join Our Loyalty Program & Earn Free Donuts!
            </h3>
            <p className="text-sm opacity-90">
              Get 50 Welcome Points immediately on registration, 100 points for referral signups, and earn 10 points for every dollar spent on online orders! Redeem points at checkout for free desserts.
            </p>
          </div>
          <Link
            to="/auth"
            className="bg-secondary text-darkBg hover:bg-secondary-light px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap"
          >
            Create Account Now
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
