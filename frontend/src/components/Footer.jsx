import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-cream-dark dark:bg-darkBg-dark border-t border-cream dark:border-darkBg-light pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        
        {/* Brand Info */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🍩</span>
            <span className="text-2xl font-extrabold tracking-wider text-primary dark:text-secondary">
              DONUTS
            </span>
          </Link>
          <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80 leading-relaxed">
            Freshly made donuts every day. Indulge in our delicious, handcrafted premium donuts baked fresh every morning.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-accent hover:text-primary dark:text-secondary dark:hover:text-white transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-accent hover:text-primary dark:text-secondary dark:hover:text-white transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="text-accent hover:text-primary dark:text-secondary dark:hover:text-white transition-colors">
              <MessageCircle size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark mb-4 uppercase tracking-wider">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-textColor-light/80 hover:text-primary dark:text-textColor-dark/80 dark:hover:text-secondary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/menu" className="text-textColor-light/80 hover:text-primary dark:text-textColor-dark/80 dark:hover:text-secondary transition-colors">
                Our Menu
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-textColor-light/80 hover:text-primary dark:text-textColor-dark/80 dark:hover:text-secondary transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="text-textColor-light/80 hover:text-primary dark:text-textColor-dark/80 dark:hover:text-secondary transition-colors">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-textColor-light/80 hover:text-primary dark:text-textColor-dark/80 dark:hover:text-secondary transition-colors">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info & Business Hours */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark mb-4 uppercase tracking-wider">
            Visit Us
          </h3>
          <div className="flex items-start space-x-2 text-sm text-textColor-light/80 dark:text-textColor-dark/80">
            <MapPin size={16} className="mt-0.5 text-primary shrink-0" />
            <span>123 Sweet Street, Dessert Hills, NY 10001</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-textColor-light/80 dark:text-textColor-dark/80">
            <Phone size={16} className="text-primary shrink-0" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-textColor-light/80 dark:text-textColor-dark/80">
            <Mail size={16} className="text-primary shrink-0" />
            <span>hello@donuts.com</span>
          </div>
          <div className="pt-2 border-t border-cream dark:border-darkBg-light">
            <span className="text-xs font-semibold block text-primary dark:text-secondary uppercase">Hours:</span>
            <span className="text-sm text-textColor-light/80 dark:text-textColor-dark/80">Monday - Sunday: 8:00 AM – 10:00 PM</span>
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark mb-4 uppercase tracking-wider">
            Newsletter
          </h3>
          <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80 mb-4">
            Get the latest sweet updates, new releases, and exclusive discount codes directly to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="px-4 py-2 w-full rounded-l-full bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark dark:border-darkBg-light focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-r-full flex items-center justify-center transition-colors"
            >
              <Send size={16} />
            </button>
          </form>
          {subscribed && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-semibold">
              Thank you for subscribing! Check your inbox for 10% off.
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-cream dark:border-darkBg-light pt-8 text-center text-xs text-textColor-light/60 dark:text-textColor-dark/60">
        <p>&copy; {new Date().getFullYear()} DONUTS Shop & Cafe. All rights reserved.</p>
        <p className="mt-1">Crafted for dessert lovers everywhere.</p>
      </div>
    </footer>
  );
};

export default Footer;
