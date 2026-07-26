import React, { useState } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = ['All', 'Donuts', 'Store Interior', 'Bakery Process', 'Staff Photos'];

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
      title: 'Decadent Chocolate Glaze',
      category: 'Donuts'
    },
    {
      url: 'https://images.unsplash.com/photo-1612240498936-65f5101365d2?auto=format&fit=crop&w=800&q=80',
      title: 'Strawberry Confetti Sprinkles',
      category: 'Donuts'
    },
    {
      url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      title: 'Cozy Morning Cafe Seating',
      category: 'Store Interior'
    },
    {
      url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
      title: 'Glazing & Dough Dusting',
      category: 'Bakery Process'
    },
    {
      url: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80',
      title: 'Evelyn Rolling Yeast Pastry',
      category: 'Staff Photos'
    },
    {
      url: 'https://images.unsplash.com/photo-1527515648294-f904791a8409?auto=format&fit=crop&w=800&q=80',
      title: 'Vanilla Bean Rainbow Dots',
      category: 'Donuts'
    },
    {
      url: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=800&q=80',
      title: 'Sleek Espresso Brew Station',
      category: 'Store Interior'
    },
    {
      url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      title: 'Yeast Fermentation Shaping',
      category: 'Bakery Process'
    },
    {
      url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
      title: 'Sarah Jenkins store Manager',
      category: 'Staff Photos'
    },
    {
      url: 'https://images.unsplash.com/photo-1533930027521-1378bf94156a?auto=format&fit=crop&w=800&q=80',
      title: 'Salted Caramel Pecan Glaze',
      category: 'Donuts'
    },
    {
      url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      title: 'Liam Chen Latte Art Foam',
      category: 'Staff Photos'
    },
    {
      url: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=800&q=80',
      title: 'Crushed Oreo White Drizzle',
      category: 'Donuts'
    }
  ];

  // Filter list
  const filteredImages = images.filter(
    (img) => activeCategory === 'All' || img.category === activeCategory
  );

  // Lightbox handlers
  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-primary dark:text-secondary flex items-center justify-center space-x-1">
          <Sparkles size={14} />
          <span>Visual Showcase</span>
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-textColor-light dark:text-textColor-dark leading-none">
          Inside Our Kitchen
        </h1>
        <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80">
          A photography tour of our custom donut finishes, cafe vibes, baking rooms, and friendly staff.
        </p>
      </div>

      {/* Category Pills Filters */}
      <div className="flex justify-center items-center space-x-2 overflow-x-auto py-2 no-scrollbar max-w-2xl mx-auto border-b border-cream dark:border-darkBg-light pb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setLightboxIndex(null); }}
            className={`px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-primary text-white shadow-md'
                : 'bg-cream-light dark:bg-darkCard text-textColor-light dark:text-textColor-dark border border-cream-dark/30 dark:border-darkBg-light hover:bg-cream-dark dark:hover:bg-darkBg-light'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Image Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 max-w-7xl mx-auto">
        {filteredImages.map((img, index) => (
          <div
            key={index}
            onClick={() => setLightboxIndex(index)}
            className="break-inside-avoid bg-cream-light dark:bg-darkCard rounded-3xl overflow-hidden border border-cream dark:border-darkBg-light relative group shadow-sm hover:shadow-lg cursor-pointer transform transition-all duration-300 hover:-translate-y-1"
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
            {/* Hover overlay details */}
            <div className="absolute inset-0 bg-darkBg/60 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-6 transition-opacity duration-300">
              <span className="text-[10px] text-secondary font-black uppercase tracking-wider">
                {img.category}
              </span>
              <h4 className="text-sm font-bold text-white mt-1">
                {img.title}
              </h4>
              <div className="absolute top-4 right-4 p-2 bg-white/20 rounded-full backdrop-blur-sm text-white">
                <Maximize2 size={14} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Slider Modal Overlay */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 bg-darkBg/95 backdrop-blur-md z-50 flex flex-col justify-center items-center p-4 animate-fade-in"
        >
          {/* Close trigger */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X size={24} />
          </button>

          {/* Navigation sliders */}
          <button
            onClick={handlePrev}
            className="absolute left-6 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Previous Image"
          >
            <ChevronLeft size={28} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-6 p-4 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
            aria-label="Next Image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image Display */}
          <div className="max-w-4xl max-h-[75vh] relative flex flex-col items-center">
            <img
              src={filteredImages[lightboxIndex].url}
              alt={filteredImages[lightboxIndex].title}
              className="max-w-full max-h-[70vh] rounded-2xl object-contain shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()} // Stop modal dismiss on image click
            />
            <div className="text-center text-white mt-4 space-y-1">
              <span className="text-[10px] font-black uppercase text-secondary tracking-widest">
                {filteredImages[lightboxIndex].category}
              </span>
              <h3 className="text-lg font-bold">
                {filteredImages[lightboxIndex].title}
              </h3>
              <span className="text-xs opacity-60 font-medium">
                Image {lightboxIndex + 1} of {filteredImages.length}
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Gallery;
