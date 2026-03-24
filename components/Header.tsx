import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full py-6 text-center mb-4">
      <h1 className="text-5xl font-bold text-gray-800">
        Authentic Food Recipes
      </h1>
      <p className="mt-2 text-lg text-gray-500">Enter your criteria below to generate a custom recipe!</p>
    </header>
  );
};

export default Header;