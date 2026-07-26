import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import {
  ShoppingCart,
  Heart,
  Sun,
  Moon,
  Menu,
  X,
  User,
  LogOut,
  Coffee,
  LayoutDashboard
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart, wishlist } = useCart();
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/auth');
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'About Us', path: '/about' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 glass shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🍩</span>
            <span className="text-2xl font-extrabold tracking-wider text-primary dark:text-secondary font-sans">
              DONUTS
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-sm font-semibold tracking-wide text-textColor-light hover:text-primary dark:text-textColor-dark dark:hover:text-secondary transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-cream-dark dark:hover:bg-darkBg-light transition-colors text-textColor-light dark:text-textColor-dark"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={20} className="text-secondary" /> : <Moon size={20} className="text-accent" />}
            </button>

            {/* Wishlist */}
            <Link
              to="/ordering"
              className="p-2 rounded-full hover:bg-cream-dark dark:hover:bg-darkBg-light relative transition-colors text-textColor-light dark:text-textColor-dark"
            >
              <Heart size={20} className="hover:text-red-500 transition-colors" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/ordering"
              className="p-2 rounded-full hover:bg-cream-dark dark:hover:bg-darkBg-light relative transition-colors text-textColor-light dark:text-textColor-dark"
            >
              <ShoppingCart size={20} className="hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white rounded-full text-[10px] w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Admin Panel Link */}
            {user?.isAdmin && (
              <Link
                to="/admin"
                className="p-2 rounded-full hover:bg-cream-dark dark:hover:bg-darkBg-light text-secondary transition-colors"
                title="Admin Dashboard"
              >
                <LayoutDashboard size={20} />
              </Link>
            )}

            {/* Auth Button */}
            {user ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-textColor-light dark:text-textColor-dark hidden lg:inline">
                  Hi, {user.name.split(' ')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-sm font-semibold border-2 border-accent hover:bg-accent hover:text-white dark:border-secondary dark:hover:bg-secondary dark:hover:text-darkBg px-3 py-1.5 rounded-full transition-all duration-300"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-1 text-sm font-bold bg-primary text-white hover:bg-primary-dark px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
              >
                <User size={14} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-textColor-light dark:text-textColor-dark"
            >
              {darkMode ? <Sun size={20} className="text-secondary" /> : <Moon size={20} className="text-accent" />}
            </button>

            <Link to="/ordering" className="relative p-2 text-textColor-light dark:text-textColor-dark">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white rounded-full text-[9px] w-4 h-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full text-textColor-light dark:text-textColor-dark focus:outline-none"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass border-t border-cream-dark dark:border-darkBg-light">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 text-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-3 text-base font-semibold text-textColor-light hover:bg-cream-dark dark:text-textColor-dark dark:hover:bg-darkBg-light rounded-md"
              >
                {link.name}
              </Link>
            ))}

            {user?.isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-3 text-base font-semibold text-secondary hover:bg-cream-dark dark:hover:bg-darkBg-light rounded-md"
              >
                Admin Panel
              </Link>
            )}

            {user ? (
              <div className="pt-4 border-t border-cream-dark dark:border-darkBg-light space-y-2">
                <p className="text-sm font-medium text-textColor-light dark:text-textColor-dark">
                  Logged in as {user.name}
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-1 bg-accent text-white px-4 py-2.5 rounded-full font-bold shadow-md hover:bg-accent-dark transition-all duration-200"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-cream-dark dark:border-darkBg-light">
                <Link
                  to="/auth"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-1 bg-primary text-white px-4 py-2.5 rounded-full font-bold shadow-md hover:bg-primary-dark transition-all duration-200"
                >
                  <User size={16} />
                  <span>Login / Register</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
