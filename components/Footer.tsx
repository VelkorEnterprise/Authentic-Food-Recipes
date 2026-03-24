import React from 'react';

const Footer: React.FC = () => {

  // Function to handle smooth scrolling to a specific section
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Function to prevent default action for placeholder links and provide user feedback
  const handlePlaceholderClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert('This page is not yet available.');
  };

  return (
    <footer id="footer" className="bg-slate-50 text-slate-600 border-t border-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Authentic Food Recipes</h3>
            <p className="text-slate-500">
              Your personal AI chef, creating tailor-made recipes from the ingredients you have. Powered by Google's Gemini API to bring culinary inspiration to your kitchen.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" onClick={handlePlaceholderClick} className="hover:text-brand-teal transition-colors">About Us</a></li>
              <li><a href="#generator" onClick={(e) => handleScrollTo(e, '#generator')} className="hover:text-brand-teal transition-colors">Generator</a></li>
              <li><a href="mailto:ma3034756@gmail.com" className="hover:text-brand-teal transition-colors">Contact</a></li>
              <li><a href="#" onClick={handlePlaceholderClick} className="hover:text-brand-teal transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Stay Inspired</h3>
            <p className="text-slate-500 mb-4">Get the latest recipes delivered to your inbox.</p>
            <form>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-3 py-2 text-slate-900 border border-slate-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-teal"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-brand-teal text-white font-semibold rounded-r-md hover:bg-brand-teal/90 transition-colors"
                >
                  Go
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Authentic Food Recipes. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;