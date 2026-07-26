import React from 'react';
import { Target, Eye, Heart, Calendar, Award, ShieldAlert, Sparkles, Smile } from 'lucide-react';

const About = () => {
  const values = [
    { icon: <Target className="text-primary" size={24} />, name: 'Our Mission', desc: 'To spread happiness through the simple joy of freshly made, delicious handcrafted donuts and premium roasted coffee.' },
    { icon: <Eye className="text-secondary" size={24} />, name: 'Our Vision', desc: 'To become the community\'s favorite third-place, known for warm hospitality, culinary innovation, and the finest artisan pastries.' },
    { icon: <Heart className="text-accent" size={24} />, name: 'Our Values', desc: 'Craftsmanship, community, absolute freshness, sustainability, and creating a fun, welcoming workplace for our family team.' }
  ];

  const timeline = [
    { year: '2018', title: 'Business Founded', desc: 'DONUTS began in Chef Evelyn\'s family kitchen with a single desktop fryer and a dream to bring authentic yeast donuts to the neighborhood.' },
    { year: '2020', title: 'First Storefront', desc: 'We opened our first cozy brick-and-mortar shop in the heart of Dessert Hills, serving fresh espresso drinks alongside our menu catalog.' },
    { year: '2023', title: 'Expansion & Deliveries', desc: 'To meet growing demand, we added modern kitchen gear, launched our online e-commerce ordering portal, and began local delivery.' },
    { year: 'Today', title: 'Celebrating Success', desc: 'Today, we bake over 1,200 donuts every single morning, support a team of 12 local staff, and have served over 100k happy customer orders!' }
  ];

  const team = [
    { name: 'Chef Evelyn Vance', role: 'Head Baker / Founder', desc: 'With a degree in pastry arts and 15 years in bakeries, Evelyn oversees dough fermentation and glazes.', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80' },
    { name: 'Sarah Jenkins', role: 'Store Manager', desc: 'Sarah coordinates our daily supply shipments, manages the staff team, and makes sure our operations are running smoothly.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
    { name: 'Liam Chen', role: 'Lead Barista', desc: 'A certified coffee enthusiast, Liam curates our Arabica bean blends and brews espresso and latte art.', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-24">
      
      {/* 1. Header Section */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-extrabold tracking-widest text-primary dark:text-secondary">
          Our Story
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-textColor-light dark:text-textColor-dark leading-none">
          Handcrafting Joy, One Donut at a Time
        </h1>
        <p className="text-base text-textColor-light/80 dark:text-textColor-dark/80 leading-relaxed pt-2">
          "Founded with a passion for creating delicious handcrafted donuts." We believe that a donut is more than just a pastry—it is a sweet moment in your day, a reason to smile, and a delicious way to connect with friends and family.
        </p>
      </section>

      {/* 2. Story Highlights Illustration / Text */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-textColor-light dark:text-textColor-dark">
            Our Dough, Our Secret
          </h2>
          <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80 leading-relaxed">
            Our secret lies in patience. Unlike standard factory operations that use frozen mixes, our dough is prepared from scratch every single day. We use a long cold-fermentation process that allows our yeast dough to rise slowly over 18 hours. This develops complex flavor notes, a soft interior, and a crisp, light bite.
          </p>
          <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80 leading-relaxed">
            Every morning at 3:00 AM, our bakers are busy rolling, cutting, frying, and glazing by hand. We use custom house-made toppings, organic vanilla bean extracts, and Belgian chocolate to bring you the highest quality desserts possible.
          </p>
          <div className="flex space-x-6 pt-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="text-primary" size={20} />
              <span className="text-xs font-bold text-textColor-light dark:text-textColor-dark">No Preservatives</span>
            </div>
            <div className="flex items-center space-x-2">
              <Smile className="text-secondary" size={20} />
              <span className="text-xs font-bold text-textColor-light dark:text-textColor-dark">100% Homemade</span>
            </div>
          </div>
        </div>
        <div className="h-96 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
            alt="Handcrafting process in the bakery"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </section>

      {/* 3. Mission, Vision, Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((v, i) => (
          <div
            key={i}
            className="bg-cream-light dark:bg-darkCard p-8 rounded-3xl border border-cream dark:border-darkBg-light shadow-sm space-y-4 hover:shadow-md transition-shadow"
          >
            <div className="p-3 bg-cream dark:bg-darkBg inline-block rounded-2xl">
              {v.icon}
            </div>
            <h3 className="text-xl font-bold text-textColor-light dark:text-textColor-dark">
              {v.name}
            </h3>
            <p className="text-xs text-textColor-light/75 dark:text-textColor-dark/75 leading-relaxed">
              {v.desc}
            </p>
          </div>
        ))}
      </section>

      {/* 4. Horizontal/Vertical Timeline */}
      <section className="space-y-16">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-textColor-light dark:text-textColor-dark">
            Our Journey
          </h2>
          <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80 mt-2">
            A look back at our milestones and how we grew into the shop we are today.
          </p>
        </div>

        <div className="relative border-l-2 border-primary/30 dark:border-secondary/20 max-w-4xl mx-auto pl-8 space-y-12">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline circle indicator */}
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-cream-light dark:bg-darkBg border-4 border-primary dark:border-secondary group-hover:scale-125 transition-transform duration-200" />
              
              <div className="bg-cream-light dark:bg-darkCard p-6 rounded-3xl border border-cream dark:border-darkBg-light shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-sm font-black text-primary dark:text-secondary">
                  {item.year}
                </span>
                <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark mt-1">
                  {item.title}
                </h3>
                <p className="text-xs text-textColor-light/75 dark:text-textColor-dark/75 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Team Section */}
      <section className="space-y-16">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-extrabold text-textColor-light dark:text-textColor-dark">
            Meet the Baker Family
          </h2>
          <p className="text-sm text-textColor-light/80 dark:text-textColor-dark/80 mt-2">
            The skilled team pouring passion and creativity into your daily treats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <div
              key={i}
              className="bg-cream-light dark:bg-darkCard rounded-3xl overflow-hidden border border-cream dark:border-darkBg-light shadow-sm flex flex-col hover:shadow-lg hover-lift group"
            >
              <div className="h-64 bg-cream-dark dark:bg-darkBg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary dark:text-secondary">
                    {member.role}
                  </span>
                  <h3 className="text-lg font-bold text-textColor-light dark:text-textColor-dark mt-1 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-xs text-textColor-light/75 dark:text-textColor-dark/75 leading-relaxed">
                    {member.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
