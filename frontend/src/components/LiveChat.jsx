import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi there! Welcome to DONUTS Shop & Cafe. 🍩 How can we sweeten your day? Ask me about our "menu", "hours", "delivery", or "coupons"!',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    const textQuery = input.toLowerCase();
    setInput('');
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      let replyText = "Thank you for reaching out! One of our team members is reviewing your message and will be right with you. 🍩";
      
      if (textQuery.includes('menu') || textQuery.includes('donut') || textQuery.includes('flavour')) {
        replyText = "We have Classic Donuts ($2.99), Premium Donuts ($3.49-$3.99), Custard/Jam Filled Donuts ($3.29), Minis, and freshly roasted espresso drinks! Check the Menu tab to order.";
      } else if (textQuery.includes('hour') || textQuery.includes('time') || textQuery.includes('open')) {
        replyText = "We are open Monday to Sunday from 8:00 AM to 10:00 PM. All of our donuts are baked fresh at 3:00 AM daily!";
      } else if (textQuery.includes('delivery') || textQuery.includes('ship') || textQuery.includes('courier')) {
        replyText = "We deliver locally! Delivery is FREE for orders over $30.00, and $3.99 for orders below that. You can also select 'Pickup' during checkout.";
      } else if (textQuery.includes('coupon') || textQuery.includes('discount') || textQuery.includes('promo')) {
        replyText = "You can use code DONUTLOVE for 10% off, or SWEETDEAL for 20% off on orders over $30.00! Apply it in your checkout cart.";
      } else if (textQuery.includes('status') || textQuery.includes('track') || textQuery.includes('order')) {
        replyText = "To check your order progress, go to the checkout page, enter your order code (e.g. DONUT-123456) in the tracking bar, and click 'Track'!";
      }

      setMessages(prev => [...prev, {
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Circle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer animate-bounce-slow"
          aria-label="Open Chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Box Drawer */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[450px] bg-cream-light dark:bg-darkCard rounded-3xl shadow-2xl border border-cream dark:border-darkBg-light flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-primary p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🍩</span>
              <div>
                <h4 className="font-bold text-sm">DONUTS Assistant</h4>
                <span className="text-[10px] opacity-80 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-1 animate-pulse"></span>
                  Active Customer Support
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-80 transition-opacity"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-cream/30 dark:bg-darkBg/30">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl p-3 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-white dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark/50 dark:border-darkBg-light rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="block text-[8px] mt-1 text-right opacity-60">
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-darkBg text-textColor-light dark:text-textColor-dark rounded-2xl rounded-tl-none p-3 border border-cream-dark/50 dark:border-darkBg-light flex items-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-textColor-light/50 dark:bg-textColor-dark/50 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-textColor-light/50 dark:bg-textColor-dark/50 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-textColor-light/50 dark:bg-textColor-dark/50 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-cream dark:border-darkBg-light bg-cream-light dark:bg-darkCard flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-grow px-4 py-2 bg-cream dark:bg-darkBg text-textColor-light dark:text-textColor-dark border border-cream-dark dark:border-darkBg-light rounded-full focus:outline-none focus:ring-1 focus:ring-primary text-xs"
            />
            <button
              type="submit"
              className="ml-2 bg-primary hover:bg-primary-dark text-white p-2.5 rounded-full flex items-center justify-center transition-colors shadow"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default LiveChat;
