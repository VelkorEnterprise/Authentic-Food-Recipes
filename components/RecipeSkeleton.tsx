import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Consulting with our digital master chefs...",
  "Slicing and dicing the data bits...",
  "Whisking up the perfect instructions...",
  "Calibrating the flavor matrix...",
  "Garnishing your recipe with a touch of code...",
];

const RecipeSkeleton: React.FC = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto p-8 flex flex-col items-center justify-center text-center animate-fade-in-up">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Outer spinning ring */}
        <div className="absolute w-full h-full rounded-full border-4 border-teal-200"></div>
        <div 
          className="absolute w-full h-full rounded-full border-t-4 border-brand-teal animate-spin"
          style={{ animationDuration: '1s' }}
        ></div>
        {/* Central icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 01-1.414 1.414L12 6.414l-2.293 2.293a1 1 0 01-1.414-1.414L10 5m0 14l2.293-2.293a1 1 0 011.414 1.414L12 19.586l2.293-2.293a1 1 0 011.414 1.414L14 19m-4-5h8a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z" />
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mt-8">Crafting your culinary masterpiece...</h2>
      <p className="text-slate-600 mt-2 max-w-sm h-10 flex items-center justify-center">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
};

export default RecipeSkeleton;