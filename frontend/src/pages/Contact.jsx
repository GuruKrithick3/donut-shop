import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const Contact = () => {
  // Contact Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ Accordion State
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const faqs = [
    { q: 'What are your store hours?', a: 'We are open Monday through Sunday, from 8:00 AM to 10:00 PM. Our delivery service operates during these same hours.' },
    { q: 'How early do I need to order for large events or catering?', a: 'For orders of 5 dozen or more, please place your order at least 24 hours in advance. This ensures our bakers can dedicate dough and oven space for your event!' },
    { q: 'Do you offer gluten-free, vegan, or nut-free options?', a: 'We offer vegan glazed donuts on weekends. We do have gluten-friendly donuts, but please note they are fried in the same oil as wheat donuts, so cross-contamination may occur. We mark all items containing nuts on our menu.' },
    { q: 'Where do you deliver, and what does it cost?', a: 'We deliver within a 5-mile radius of our store location. Delivery is a flat $3.99, but is completely FREE for any orders over $30.00!' },
    { q: 'How can I earn and redeem loyalty points?', a: 'Simply register an account on our website! You get 50 welcome points instantly. Every dollar spent on online checkouts earns you 10 points. You can apply points during checkout to receive cash-off discounts.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-24">
      
      {/* Page Header */}
      <section className="text-center max-w-xl mx-auto space-y-3">
        <span className="text-xs uppercase font-extrabold tracking-widest text-primary dark:text-secondary">
          Get in Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-textColor-light dark:text-textColor-dark leading-none">
          Contact Our Team
        </h1>
        <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80">
          Have questions about catering, private parties, custom glaze creations, or order status? Send us a message!
        </p>
      </section>

      {/* Main Form & Contact Info */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
        {/* Contact info cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-cream-light dark:bg-darkCard p-8 rounded-3xl border border-cream dark:border-darkBg-light shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-textColor-light dark:text-textColor-dark">
              Store Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-sm text-textColor-light/80 dark:text-textColor-dark/80">
                <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-textColor-light dark:text-textColor-dark">Our Address</span>
                  <span>123 Sweet Street, Dessert Hills, NY 10001</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm text-textColor-light/80 dark:text-textColor-dark/80">
                <Phone size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-textColor-light dark:text-textColor-dark">Phone Number</span>
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm text-textColor-light/80 dark:text-textColor-dark/80">
                <Mail size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-textColor-light dark:text-textColor-dark">Email Support</span>
                  <span>hello@donuts.com</span>
                </div>
              </div>
              <div className="flex items-start space-x-3 text-sm text-textColor-light/80 dark:text-textColor-dark/80">
                <MessageCircle size={20} className="text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block text-textColor-light dark:text-textColor-dark">WhatsApp Business</span>
                  <span>+1 (555) 765-4321</span>
                </div>
              </div>
            </div>

            <div className="border-t border-cream dark:border-darkBg-light pt-6">
              <span className="text-xs font-bold text-primary dark:text-secondary uppercase block mb-1">Business Hours:</span>
              <span className="text-sm text-textColor-light/80 dark:text-textColor-dark/80">Monday - Sunday: 8:00 AM – 10:00 PM</span>
            </div>
          </div>

          {/* Interactive Mock Map Canvas */}
          <div className="bg-cream-light dark:bg-darkCard rounded-3xl overflow-hidden border border-cream dark:border-darkBg-light shadow-sm h-64 relative flex items-center justify-center text-center">
            {/* Styled vector map background */}
            <div className="absolute inset-0 bg-cream dark:bg-darkBg opacity-35" />
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 pointer-events-none opacity-20">
              {[...Array(32)].map((_, i) => (
                <div key={i} className="border border-textColor-light/20 dark:border-textColor-dark/20" />
              ))}
            </div>
            
            {/* Visual Pinpoint */}
            <div className="relative z-10 flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-ping absolute" />
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg relative">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-black text-sm text-textColor-light dark:text-textColor-dark">DONUTS Flagship Store</h4>
                <p className="text-[10px] text-textColor-light/60 dark:text-textColor-dark/60 font-semibold uppercase">40.7128° N, 74.0060° W</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-cream-light dark:bg-darkCard p-8 rounded-3xl border border-cream dark:border-darkBg-light shadow-sm">
          <h3 className="text-xl font-bold text-textColor-light dark:text-textColor-dark mb-6">
            Send Us a Message
          </h3>
          
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle size={32} />
              </div>
              <h4 className="text-lg font-bold text-textColor-light dark:text-textColor-dark">Message Sent Successfully!</h4>
              <p className="text-xs text-textColor-light/75 dark:text-textColor-dark/75 max-w-sm mx-auto">
                Thank you for contacting DONUTS. A member of our customer service family will reply to your email within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-textColor-light/65 dark:text-textColor-dark/65">Message *</label>
                <textarea
                  rows="5"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we help you? Let us know the details."
                  className="w-full px-4 py-2.5 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-2xl focus:outline-none text-xs font-semibold"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-full font-bold shadow-md hover:shadow-lg transition-colors flex items-center justify-center space-x-2 text-xs"
              >
                <span>Send Message</span>
                <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="max-w-4xl mx-auto space-y-12">
        <div className="text-center max-w-md mx-auto space-y-2">
          <HelpCircle size={32} className="mx-auto text-primary" />
          <h2 className="text-3xl font-extrabold text-textColor-light dark:text-textColor-dark">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80">
            Got queries? We have answers. Check out our quick answers below.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFAQIndex === idx;
            return (
              <div
                key={idx}
                className="bg-cream-light dark:bg-darkCard rounded-3xl border border-cream dark:border-darkBg-light overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFAQIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none font-bold text-sm text-textColor-light dark:text-textColor-dark hover:bg-cream/45 dark:hover:bg-darkBg/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} className="text-primary" /> : <ChevronDown size={18} className="text-primary" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-xs text-textColor-light/75 dark:text-textColor-dark/75 leading-relaxed animate-fade-in border-t border-cream dark:border-darkBg-light pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default Contact;
