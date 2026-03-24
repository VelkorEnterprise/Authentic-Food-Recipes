import React, { useRef, useEffect, useState } from 'react';
import { Recipe } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import CookingMode from './CookingMode';

interface RecipeDisplayProps {
  recipe: Recipe;
  imageUrl: string | null;
  onDownload: () => void;
  onShare: () => void;
  isDownloading: boolean;
}

const NutritionInfo: React.FC<{ label: string, value: string, icon: React.ReactElement }> = ({ label, value, icon }) => (
    <div className="flex flex-col items-center text-center p-2">
        <div className="text-brand-teal mb-1">{icon}</div>
        <span className="font-bold text-lg text-slate-900">{value}</span>
        <span className="text-sm text-slate-600">{label}</span>
    </div>
);

const AnimatedListItem: React.FC<{ children: React.ReactNode; index: number }> = ({ children, index }) => {
  const ref = useRef<HTMLLIElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <li
      ref={ref}
      className={`flex transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {children}
    </li>
  );
};

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, imageUrl, onDownload, onShare, isDownloading }) => {
  const [isCookingMode, setIsCookingMode] = useState(false);

  return (
    <>
      {isCookingMode && (
        <CookingMode recipe={recipe} onClose={() => setIsCookingMode(false)} />
      )}
      <div className="w-full flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
        {imageUrl && (
          <div className="lg:w-5/12 flex-shrink-0 bg-slate-100">
            <img src={imageUrl} alt={recipe.recipeName} className="w-full h-full object-cover" />
          </div>
        )}
        <div className={`w-full ${imageUrl ? 'lg:w-7/12' : ''} p-6 md:p-8`}>
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl font-bold text-slate-900">{recipe.recipeName}</h1>
            <button 
              onClick={() => setIsCookingMode(true)}
              className="hidden sm:flex items-center px-4 py-2 bg-brand-orange text-white font-bold rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:bg-brand-orange/90 hover:shadow-[0_0_20px_rgba(249,115,22,0.6)] transition-all transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Cooking Mode
            </button>
          </div>
          <div className="flex items-center text-slate-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{recipe.totalTime}</span>
          </div>
          <p className="text-base text-slate-700 mb-6">{recipe.description}</p>
          
          {/* Mobile Cooking Mode Button */}
          <button 
            onClick={() => setIsCookingMode(true)}
            className="sm:hidden w-full flex justify-center items-center px-4 py-3 mb-6 bg-brand-orange text-white font-bold rounded-xl shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:bg-brand-orange/90 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Cooking Mode
          </button>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={onDownload}
              disabled={isDownloading}
              className="flex items-center px-4 py-2 bg-brand-teal text-white font-semibold rounded-lg shadow-[0_0_15px_rgba(20,184,166,0.3)] hover:bg-brand-teal/90 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                  <>
                    <LoadingSpinner small />
                    <span className="ml-2">Downloading...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download
                  </>
                )
              }
            </button>
            <button
              onClick={onShare}
              className="flex items-center px-4 py-2 bg-slate-100 text-slate-700 font-semibold rounded-lg shadow-sm hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
            >
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
              Share
            </button>
          </div>

          {recipe.nutrition && (
            <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h2 className="text-xl font-semibold text-slate-900 mb-4 text-center border-b border-slate-200 pb-2">Nutrition Facts <span className="text-sm font-normal text-slate-500">(per serving)</span></h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                     <NutritionInfo label="Calories" value={recipe.nutrition.calories} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} />
                     <NutritionInfo label="Protein" value={recipe.nutrition.protein} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>} />
                     <NutritionInfo label="Carbs" value={recipe.nutrition.carbohydrates} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>} />
                     <NutritionInfo label="Fat" value={recipe.nutrition.fat} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 00-.517-3.86l-2.387-.477a2 2 0 00-1.022.547z" /></svg>} />
                </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">Ingredients</h2>
              <ul className="space-y-2 list-disc list-inside text-slate-700">
                {recipe.ingredients.map((ingredient, index) => <li key={index}>{ingredient}</li>)}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">Instructions</h2>
              <ol className="space-y-4 text-slate-700">
                {recipe.instructions.map((step, index) => (
                  <AnimatedListItem key={index} index={index}>
                    <span className="mr-3 font-bold text-brand-teal">{index + 1}.</span>
                    <span>{step}</span>
                  </AnimatedListItem>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeDisplay;
