// Default/starter content used to seed a brand-new, empty database.
// No hardcoded _id/id values here on purpose — both MongoDB (via Mongoose)
// and the local mock store generate their own IDs automatically when a
// document is created.

export const adminUserSeed = {
  name: 'Donuts Admin',
  email: 'admin@donuts.com',
  password: 'admin123', // hashed before insertion, see seed.js
  isAdmin: true,
  loyaltyPoints: 500,
  referralCode: 'ADMIN5'
};

export const defaultProducts = [
  {
    name: 'Chocolate Donut',
    category: 'Classic Donuts',
    description: 'Decadent milk chocolate glazed donut topped with fine chocolate flakes.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80',
    isBestSeller: true,
    inStock: true
  },
  {
    name: 'Strawberry Donut',
    category: 'Classic Donuts',
    description: 'Sweet strawberry glaze topped with colorful sprinkles on our signature soft dough.',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1612240498936-65f5101365d2?auto=format&fit=crop&w=600&q=80',
    isBestSeller: true,
    inStock: true
  },
  {
    name: 'Vanilla Sprinkle Donut',
    category: 'Mini Donuts',
    description: 'Classic vanilla bean glaze with festive sugar sprinkles.',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1527515648294-f904791a8409?auto=format&fit=crop&w=600&q=80',
    isBestSeller: true,
    inStock: true
  },
  {
    name: 'Caramel Donut',
    category: 'Premium Donuts',
    description: 'Rich salted caramel glaze drizzled with butterscotch and sea salt.',
    price: 3.49,
    image: '/images/images (3).jpg',
    isBestSeller: true,
    inStock: true
  },
  {
    name: 'Oreo Donut',
    category: 'Premium Donuts',
    description: 'Cookies & cream glaze topped with crushed Oreo cookies and white chocolate drizzle.',
    price: 3.89,
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=600&q=80',
    isBestSeller: true,
    inStock: true
  },
  {
    name: 'Original Glazed',
    category: 'Classic Donuts',
    description: 'Our traditional melt-in-your-mouth yeast donut with sweet glaze.',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    isBestSeller: true,
    inStock: true
  },
  {
    name: 'Nutella Dream',
    category: 'Premium Donuts',
    description: 'Loaded with premium Nutella hazelnut spread and dusted with cocoa.',
    price: 3.99,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80',
    isBestSeller: false,
    inStock: true
  },
  {
    name: 'Custard Filled',
    category: 'Filled Donuts',
    description: 'Filled with velvety Bavarian cream and topped with powdered sugar.',
    price: 3.29,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    isBestSeller: false,
    inStock: true
  },
  {
    name: 'Strawberry Filled',
    category: 'Filled Donuts',
    description: 'Stuffed with fresh strawberry compote and coated with fine sugar crystals.',
    price: 3.29,
    image: 'https://images.unsplash.com/photo-1570745585093-bc97e163b400?auto=format&fit=crop&w=600&q=80',
    isBestSeller: false,
    inStock: true
  },
  {
    name: 'Espresso',
    category: 'Coffee and Drinks',
    description: 'A rich and intense single shot of premium Arabica beans.',
    price: 2.29,
    image: 'https://images.unsplash.com/photo-1510972527409-cef6e4895ff4?auto=format&fit=crop&w=600&q=80',
    isBestSeller: false,
    inStock: true
  },
  {
    name: 'Cappuccino',
    category: 'Coffee and Drinks',
    description: 'Espresso topped with equal parts steamed milk and creamy foam.',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=600&q=80',
    isBestSeller: false,
    inStock: true
  },
  {
    name: 'Latte',
    category: 'Coffee and Drinks',
    description: 'Smooth espresso paired with freshly steamed milk and a thin layer of foam.',
    price: 3.79,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?auto=format&fit=crop&w=600&q=80',
    isBestSeller: false,
    inStock: true
  }
];

export const defaultCoupons = [
  { code: 'DONUTLOVE', discountType: 'percentage', discountValue: 10, minCartAmount: 0, active: true },
  { code: 'SWEETDEAL', discountType: 'percentage', discountValue: 20, minCartAmount: 30, active: true },
  { code: 'FIRSTDONUT', discountType: 'fixed', discountValue: 5.0, minCartAmount: 15, active: true }
];

export const defaultBlogs = [
  {
    title: 'The Art of Handcrafting Donuts',
    summary: 'Explore the delicate chemistry and craftsmanship that goes into making the perfect fluffy donut dough every single morning.',
    content: 'Making donuts is not just baking; it is an art form. Every day at 3:00 AM, our bakers start preparing the dough. Yeast dough requires precise humidity, temperature, and rising times to create that perfect pillowy interior. We use organic high-protein flour, farm-fresh pasture eggs, and pure grass-fed butter. The secret lies in our long cold fermentation process, allowing the sugars in the flour to develop rich flavors before frying. We fry in high-smoke-point expeller-pressed oil at exactly 375°F to ensure they crisp beautifully without absorbing grease. This attention to detail is why our signature donuts melt in your mouth!',
    author: 'Chef Evelyn Vance (Head Baker)',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80',
    publishedAt: new Date().toISOString()
  },
  {
    title: 'Coffee & Donuts: The Perfect Pairing',
    summary: 'Why do coffee and donuts complement each other so well? Learn the science behind this historical culinary pairing.',
    content: 'It is a pairing as old as time: a fresh glazed donut and a steaming cup of dark coffee. But why do they work so well? Scientists tell us it is about the interplay between bitter caffeine and sweet fats. The bitterness of roasted coffee beans cuts through the heavy sweetness of glazed sugar, cleaning your palate after every bite. Furthermore, the fats in the donut milk glaze coat the tongue, softening the astringency of hot coffee. At DONUTS, we source premium single-origin Arabica beans from the Ethiopian highlands, roasted light-medium, specifically blending fruity acidity to balance our decadent premium toppings like chocolate and salted caramel.',
    author: 'Liam Chen (Lead Barista)',
    image: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0ec6?auto=format&fit=crop&w=600&q=80',
    publishedAt: new Date().toISOString()
  },
  {
    title: 'Behind the Scenes: A Day in the Life',
    summary: 'Step behind the counter and see what it takes to run a bustling donut shop and cafe from dawn to dusk.',
    content: 'Ever wondered what happens before we open our doors at 8:00 AM? The kitchen is a hub of action. While the bakers prepare frostings and glaze pans, our manager coordinates delivery trucks bringing fresh fruits, cream, and coffee beans. By 7:30 AM, our storefront smells like vanilla and roasted hazelnuts. The doors open, and a rush of commuters and students fills the shop. Designing a workflow that serving coffee in under 90 seconds while maintaining artisanal standards is our daily mountain to climb. We love seeing our regulars walk in and knowing exactly what they want before they even order!',
    author: 'Sarah Jenkins (Store Manager)',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    publishedAt: new Date().toISOString()
  }
];

export const defaultReviews = [
  { name: 'Marcus Sterling', rating: 5, comment: 'The Oreo Donut is hands down the best thing I have ever tasted! Fluffy, sweet, and perfectly crunchy.', ratingDate: new Date().toISOString() },
  { name: 'Emily Rodriguez', rating: 5, comment: 'Clean shop, friendly staff, and the cappuccino pairs perfectly with their classic original glazed.', ratingDate: new Date().toISOString() },
  { name: 'David Kim', rating: 4, comment: 'Highly recommend the Salted Caramel Donut. Ordering online was fast and my pickup was ready on time.', ratingDate: new Date().toISOString() },
  { name: 'Chloe Watson', rating: 5, comment: 'Their mini sprinkle donuts were a massive hit at my daughter\'s birthday party! Will definitely order again.', ratingDate: new Date().toISOString() },
  { name: 'Brian Miller', rating: 5, comment: 'Great coffee, cozy environment for studying, and absolute top tier fresh artisan donuts.', ratingDate: new Date().toISOString() },
  { name: 'Sophia Lopez', rating: 5, comment: 'I love the loyalty points! Getting a free donut with my coffee is the perfect highlight of my mornings.', ratingDate: new Date().toISOString() }
];
