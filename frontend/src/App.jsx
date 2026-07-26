import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context Providers
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

// Common Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import LiveChat from './components/LiveChat.jsx';

// Pages
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Menu from './pages/Menu.jsx';
import Ordering from './pages/Ordering.jsx';
import Gallery from './pages/Gallery.jsx';
import Contact from './pages/Contact.jsx';
import Blog from './pages/Blog.jsx';
import Auth from './pages/Auth.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';

// Route Guards
import AdminRoute from './components/AdminRoute.jsx';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen">
              {/* Global Navigation Bar */}
              <Navbar />

              {/* Page Content viewport */}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/menu" element={<Menu />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/auth" element={<Auth />} />
                  
                  {/* Protected Admin Console */}
                  <Route
                    path="/admin"
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    }
                  />
                  
                  {/* Ordering Shopping Cart Page */}
                  <Route path="/ordering" element={<Ordering />} />

                  {/* Fallback Catch-All Redirect */}
                  <Route path="*" element={<Home />} />
                </Routes>
              </main>

              {/* Floating Live customer support chat simulation */}
              <LiveChat />

              {/* Global Site Footer */}
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
