
import React from 'react';

export interface RecipeCardData {
  category: string;
  title: string;
  image: string;
}

interface RecipeCardProps {
  recipe: RecipeCardData;
  onGenerateRecipe: (dishName: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onGenerateRecipe }) => {
  return (
    <div
      className="phantom-panel rounded-xl overflow-hidden cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border border-slate-200 bg-white"
      onClick={() => onGenerateRecipe(recipe.title)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onGenerateRecipe(recipe.title); }}
      tabIndex={0}
      role="button"
      aria-label={`Generate recipe for ${recipe.title}`}
    >
      <div className="overflow-hidden h-40 flex-shrink-0 bg-slate-100">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out" 
          onError={(e) => {
            e.currentTarget.src = "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800";
            e.currentTarget.alt = "Delicious food placeholder";
          }}
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-brand-teal font-semibold mb-1 uppercase tracking-wider">{recipe.category}</p>
        <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-brand-primary transition-colors flex-grow">{recipe.title}</h3>
        <span className="text-sm font-semibold text-brand-primary mt-auto">
          Generate Recipe <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">&rarr;</span>
        </span>
      </div>
    </div>
  );
};

export default RecipeCard;
