import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Sarah Jenkins",
      role: "Busy Mom of 3",
      text: "This app completely changed my weeknights. I just type in whatever is left in the fridge, and it gives me a healthy, kid-approved meal in seconds. The privacy is amazing—no signups, just instant recipes.",
      rating: 5
    },
    {
      name: "David Chen",
      role: "Fitness Enthusiast",
      text: "The macro tracking and dietary preference filters are world-class. I requested a high-protein, low-carb dinner with chicken and spinach, and the result was restaurant-quality. 100% free and incredibly fast.",
      rating: 5
    },
    {
      name: "Elena Rodriguez",
      role: "College Student",
      text: "I used to waste so much food because I didn't know how to combine random ingredients. This AI chef is a lifesaver. The step-by-step cooking mode makes me feel like a pro in the kitchen.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <div className="flex text-brand-secondary">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            <span className="text-2xl font-bold text-slate-900 ml-2">4.9/5</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-primary mb-4">Trusted by Millions Daily</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Join over 1,000,000+ home cooks who use our AI to reduce food waste and eat better every single day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white/50 backdrop-blur-lg p-8 rounded-3xl flex flex-col justify-between shadow-xl border border-white/50 hover:scale-105 transition-transform duration-300">
              <div>
                <div className="flex text-brand-secondary mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 text-lg leading-relaxed mb-6 italic">"{t.text}"</p>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-teal to-brand-primary flex items-center justify-center text-white font-bold text-xl mr-4">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-slate-900 font-bold">{t.name}</h4>
                  <p className="text-brand-teal text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
