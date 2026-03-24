import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-teal via-brand-primary to-brand-orange-dark text-white shadow-2xl mb-12">
      {/* Abstract background shapes */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white blur-3xl mix-blend-overlay"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full bg-brand-secondary blur-3xl mix-blend-overlay transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-brand-orange blur-3xl mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 px-8 py-16 md:py-24 md:px-16 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-3/5 mb-10 md:mb-0">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium mb-6 animate-fade-in-up">
            ✨ AI-Powered Culinary Magic
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight speakable-headline animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Your Ingredients,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-brand-secondary">Endless Possibilities.</span>
          </h1>
          <p className="text-lg md:text-xl text-teal-50 max-w-xl mb-8 leading-relaxed speakable-summary animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Stop wondering what's for dinner. Tell our AI chef what's in your fridge, and get a world-class, custom recipe in seconds.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <button 
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full bg-white text-brand-primary font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Start Cooking Now
            </button>
            <button 
              onClick={() => document.getElementById('popular-recipes')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full bg-black/20 backdrop-blur-md border border-white/30 text-white font-bold text-lg hover:bg-black/30 transition-all duration-300"
            >
              Explore Popular
            </button>
          </div>
        </div>
        
        <div className="md:w-2/5 relative animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            {/* Decorative circles behind image */}
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-4 rounded-full border border-white/30 animate-[spin_15s_linear_infinite_reverse]"></div>
            
            <img 
              src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&dpr=2" 
              alt="Fresh healthy food" 
              className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] object-cover rounded-full shadow-2xl border-4 border-white/50"
              referrerPolicy="no-referrer"
            />
            
            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white text-slate-900 px-4 py-2 rounded-2xl shadow-xl font-bold text-sm transform rotate-6 animate-bounce">
              ⏱️ Ready in 20m
            </div>
            <div className="absolute bottom-8 -left-8 bg-white text-slate-900 px-4 py-2 rounded-2xl shadow-xl font-bold text-sm transform -rotate-6 animate-bounce" style={{ animationDelay: '500ms' }}>
              🥑 100% Healthy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;