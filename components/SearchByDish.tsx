import React, { useState } from 'react';

interface SearchByDishProps {
  onSearch: (dish: string) => void;
  isLoading: boolean;
}

const SearchByDish: React.FC<SearchByDishProps> = ({ onSearch, isLoading }) => {
  const [dish, setDish] = useState('');

  const handleSearchClick = () => {
    if (dish.trim()) {
      onSearch(dish.trim());
      setDish('');
    }
  };

  return (
    <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-xl shadow-lg animate-fade-in-up mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-800">Craving something specific?</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          value={dish}
          onChange={(e) => setDish(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearchClick();
            }
          }}
          placeholder="e.g., Lasagna, Pad Thai"
          className="flex-grow px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-teal"
          disabled={isLoading}
        />
        <button
          onClick={handleSearchClick}
          className="px-4 py-2 font-semibold text-white transition-colors duration-300 bg-brand-teal rounded-lg hover:bg-brand-teal-dark focus:outline-none focus:ring-2 focus:ring-brand-teal-dark focus:ring-offset-2 disabled:bg-gray-400"
          disabled={isLoading || !dish.trim()}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchByDish;
