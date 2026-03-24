import React, { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import { RecipeRequest } from '../services/geminiService';

interface RecipeSectionsProps {
  onGenerate: (formData: RecipeRequest) => void;
  isLoading: boolean;
}

const RecipeSections: React.FC<RecipeSectionsProps> = ({ onGenerate, isLoading }) => {
  const [ingredients, setIngredients] = useState('');
  const [servingSize, setServingSize] = useState('any');
  const [cuisine, setCuisine] = useState('any');
  const [difficulty, setDifficulty] = useState('any');
  const [cookingTime, setCookingTime] = useState('any');
  const [dietaryPreferences, setDietaryPreferences] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ ingredients, servingSize, cuisine, difficulty, cookingTime, dietaryPreferences });
  };

  return (
    <div className="w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-slate-700 mb-1">
            Ingredients or Dish Name <span className="text-brand-orange">*</span>
          </label>
          <input
            id="ingredients"
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="e.g., chicken, broccoli, carrots"
            className="w-full px-4 py-3 text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal placeholder-slate-400 transition-all shadow-sm"
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="servingSize" className="block text-sm font-medium text-slate-700 mb-1">Serving Size</label>
            <select id="servingSize" value={servingSize} onChange={(e) => setServingSize(e.target.value)} disabled={isLoading} className="w-full px-4 py-3 text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all appearance-none shadow-sm">
              <option value="any">Any</option>
              <option value="1 person">1 person</option>
              <option value="2 people">2 people</option>
              <option value="4 people">4 people</option>
              <option value="6+ people">6+ people</option>
            </select>
          </div>
          <div>
            <label htmlFor="cuisine" className="block text-sm font-medium text-slate-700 mb-1">Cuisine</label>
            <select id="cuisine" value={cuisine} onChange={(e) => setCuisine(e.target.value)} disabled={isLoading} className="w-full px-4 py-3 text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all appearance-none shadow-sm">
              <option value="any">Any</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Chinese">Chinese</option>
              <option value="Indian">Indian</option>
              <option value="Japanese">Japanese</option>
              <option value="Thai">Thai</option>
              <option value="American">American</option>
              <option value="Mediterranean">Mediterranean</option>
            </select>
          </div>
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-slate-700 mb-1">Difficulty</label>
            <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} disabled={isLoading} className="w-full px-4 py-3 text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all appearance-none shadow-sm">
              <option value="any">Any</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div>
            <label htmlFor="cookingTime" className="block text-sm font-medium text-slate-700 mb-1">Cooking Time</label>
            <select id="cookingTime" value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} disabled={isLoading} className="w-full px-4 py-3 text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal transition-all appearance-none shadow-sm">
              <option value="any">Any</option>
              <option value="Under 30 minutes">Under 30 minutes</option>
              <option value="30-60 minutes">30-60 minutes</option>
              <option value="Over 60 minutes">Over 60 minutes</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="dietaryPreferences" className="block text-sm font-medium text-slate-700 mb-1">Dietary Preferences</label>
          <input
            id="dietaryPreferences"
            type="text"
            value={dietaryPreferences}
            onChange={(e) => setDietaryPreferences(e.target.value)}
            placeholder="e.g., vegetarian, gluten-free, dairy-free"
            className="w-full px-4 py-3 text-slate-900 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-teal placeholder-slate-400 transition-all shadow-sm"
            disabled={isLoading}
          />
        </div>

        <button type="submit" disabled={isLoading || !ingredients.trim()} className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-[0_0_20px_rgba(20,184,166,0.3)] text-lg font-bold text-white bg-gradient-to-r from-brand-teal to-brand-primary hover:from-brand-teal/90 hover:to-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-teal disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1">
          {isLoading ? (
            <>
              <LoadingSpinner small />
              <span className="ml-2">Generating...</span>
            </>
          ) : (
            'Generate Recipe'
          )}
        </button>
      </form>
    </div>
  );
};

export default RecipeSections;
