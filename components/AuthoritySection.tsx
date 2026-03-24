import React from 'react';

const AuthoritySection: React.FC = () => {
  return (
    <article className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-primary mb-6">
          The Ultimate Guide to AI Recipe Generation
        </h1>
        <p className="text-2xl text-slate-600 max-w-4xl mx-auto font-light">
          Stop wasting food and start cooking smarter. Discover how artificial intelligence is revolutionizing the home kitchen, saving you hours of meal prep and hundreds of dollars on groceries.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Main Content - Bento Grid Style */}
        <div className="md:col-span-8 space-y-8">
          
          {/* Section 1 */}
          <section className="bg-white/50 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white/50">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why AI is the Future of Home Cooking</h2>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              The average household throws away nearly 30% of the food they buy. Why? Because combining leftover ingredients into a cohesive meal requires culinary intuition that most people don't have time to develop. This is where an <a href="#generator" className="text-brand-teal hover:underline font-semibold">AI Recipe Generator</a> changes everything.
            </p>
            <p className="text-slate-700 text-lg leading-relaxed">
              By analyzing flavor compounds, cooking techniques, and nutritional profiles, our engine can instantly generate a 100% unique recipe based strictly on what's already in your fridge. No more last-minute grocery runs. No more wasted produce.
            </p>
          </section>

          {/* Section 2 */}
          <section className="bg-white/50 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white/50 bg-gradient-to-br from-slate-50 to-brand-primary/10">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">How to Optimize Your Pantry for AI</h3>
            <ul className="space-y-4 text-slate-700 text-lg">
              <li className="flex items-start">
                <span className="text-brand-secondary mr-3 text-xl">✓</span>
                <span><strong>Stock the Basics:</strong> Always keep olive oil, salt, pepper, garlic, and onions on hand. These form the base of 90% of savory dishes.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-secondary mr-3 text-xl">✓</span>
                <span><strong>Embrace Frozen Veggies:</strong> They are flash-frozen at peak ripeness and are perfect for AI-generated stir-fries and soups.</span>
              </li>
              <li className="flex items-start">
                <span className="text-brand-secondary mr-3 text-xl">✓</span>
                <span><strong>Versatile Proteins:</strong> Eggs, canned beans, and tofu have long shelf lives and adapt to almost any flavor profile.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white/50 backdrop-blur-lg p-10 rounded-3xl shadow-xl border border-white/50">
            <h4 className="text-xl font-bold text-slate-900 mb-4">The Science of Flavor Pairing</h4>
            <p className="text-slate-700 text-lg leading-relaxed mb-6">
              Our system doesn't just throw ingredients together randomly. It uses a vast database of chemical flavor compounds. For example, did you know that strawberries and tomatoes share similar aromatic compounds? Or that coffee enhances the flavor of chocolate?
            </p>
            <p className="text-slate-700 text-lg leading-relaxed">
              When you input seemingly mismatched ingredients, the AI finds the culinary "bridge" that connects them, often resulting in surprisingly delicious, Michelin-inspired combinations that you would never find in a traditional cookbook.
            </p>
          </section>

        </div>

        {/* Sidebar */}
        <aside className="md:col-span-4 space-y-8">
          <div className="bg-white/50 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/50 border-t-4 border-t-brand-secondary">
            <h5 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-wider">Quick Links</h5>
            <nav className="flex flex-col space-y-3">
              <a href="#popular-recipes" className="text-brand-teal hover:text-slate-900 transition-colors flex items-center">
                <span className="mr-2">→</span> Top 10 AI Recipes of 2026
              </a>
              <a href="#generator" className="text-brand-teal hover:text-slate-900 transition-colors flex items-center">
                <span className="mr-2">→</span> Try the Fridge Clearing Tool
              </a>
              <a href="#proof" className="text-brand-teal hover:text-slate-900 transition-colors flex items-center">
                <span className="mr-2">→</span> See the Nutritional Data
              </a>
              <a href="#testimonials" className="text-brand-teal hover:text-slate-900 transition-colors flex items-center">
                <span className="mr-2">→</span> Read User Success Stories
              </a>
            </nav>
          </div>

          <div className="bg-white/50 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/50 text-center">
            <h6 className="text-slate-900 font-bold mb-4">Ready to stop wasting food?</h6>
            <p className="text-slate-600 text-sm mb-6">Join millions of users generating free, instant recipes daily. No signup required.</p>
            <button 
              onClick={() => document.getElementById('generator')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full py-3 px-6 bg-brand-primary hover:bg-brand-primary/80 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)]"
            >
              Start Cooking Now
            </button>
          </div>
        </aside>
      </div>
    </article>
  );
};

export default AuthoritySection;
