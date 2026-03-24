import React from 'react';
import { Recipe } from '../types';
import ErrorMessage from './ErrorMessage';
import RecipeDisplay from './RecipeDisplay';
import RecipeSkeleton from './RecipeSkeleton';

interface RecipeModalProps {
  recipe: Recipe | null;
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  onClose: () => void;
  onDownload: () => void;
  onShare: () => void;
  isDownloading: boolean;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ recipe, imageUrl, isLoading, error, onClose, onDownload, onShare, isDownloading }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10"
          aria-label="Close recipe view"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="p-8 md:p-12">
          {isLoading && <RecipeSkeleton />}
          {error && !isLoading && <ErrorMessage message={error} />}
          {recipe && !isLoading && (
             <div>
                {imageUrl && (
                    <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
                        <img src={imageUrl} alt={recipe.recipeName} className="w-full h-auto max-h-[400px] object-cover" />
                    </div>
                )}
                <RecipeDisplay recipe={recipe} imageUrl={imageUrl} onDownload={onDownload} onShare={onShare} isDownloading={isDownloading} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeModal;