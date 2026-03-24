import React, { useState } from 'react';
import RecipeCard from './RecipeCard';
import { RecipeCardData } from './RecipeCard';
import {
  beefNihari, hyderabadiBiryani, pastaCarbonara, assortedSushi, molePoblano, seafoodPaella,
  gourmetHamburger, padThai, vietnamesePho, brazilianFeijoada, germanSauerbraten, kimchiJjigae,
  koshari, hungarianGoulash, pekingDuck, chickenKarahi, cheloKabab, beefStroganoff, nasiGoreng, jollofRice,
  chocolateLavaCake, redVelvetCheesecake, berryPannaCotta,
  pistachioBaklava, frenchMacarons, rubyChocolateMousse, classicTiramisu, cremeBrulee,
  strawberryShortcake, classicMojito, tequilaSunrise, espressoMartini, aperolSpritz,
  oldFashioned, spicyMargarita, icedMatchaLatte, pinaColada, blueLagoon
} from './RecipeImageData';

const popularReadsData: RecipeCardData[] = [
  { category: 'Pakistan', title: 'Beef Nihari', image: beefNihari },
  { category: 'Pakistan', title: 'Chicken Karahi', image: chickenKarahi },
  { category: 'Iran', title: 'Chelo Kabab', image: cheloKabab },
  { category: 'Russia', title: 'Beef Stroganoff', image: beefStroganoff },
  { category: 'Indonesia', title: 'Nasi Goreng', image: nasiGoreng },
  { category: 'Nigeria', title: 'Jollof Rice', image: jollofRice },
  { category: 'India', title: 'Hyderabadi Biryani', image: hyderabadiBiryani },
  { category: 'Italy', title: 'Pasta Carbonara', image: pastaCarbonara },
  { category: 'Japan', title: 'Assorted Sushi Platter', image: assortedSushi },
  { category: 'Mexico', title: 'Mole Poblano with Chicken', image: molePoblano },
  { category: 'Spain', title: 'Seafood Paella Valenciana', image: seafoodPaella },
  { category: 'USA', title: 'Gourmet Hamburger', image: gourmetHamburger },
  { category: 'Thailand', title: 'Authentic Pad Thai', image: padThai },
  { category: 'Vietnam', title: 'Traditional Vietnamese Pho', image: vietnamesePho },
  { category: 'Brazil', title: 'Brazilian Feijoada', image: brazilianFeijoada },
  { category: 'Germany', title: 'German Sauerbraten with Dumplings', image: germanSauerbraten },
  { category: 'South Korea', title: 'Kimchi Jjigae (Kimchi Stew)', image: kimchiJjigae },
  { category: 'Egypt', title: 'Koshari, Egyptian National Dish', image: koshari },
  { category: 'Hungary', title: 'Hearty Hungarian Goulash', image: hungarianGoulash },
  { category: 'China', title: 'Peking Duck', image: pekingDuck },
];

const royalDessertsData: RecipeCardData[] = [
  { category: 'Dessert', title: 'Decadent Chocolate Lava Cake', image: chocolateLavaCake },
  { category: 'Dessert', title: 'Creamy Red Velvet Cheesecake', image: redVelvetCheesecake },
  { category: 'Dessert', title: 'Silky Berry Panna Cotta', image: berryPannaCotta },
  { category: 'Dessert', title: 'Crispy Pistachio Baklava', image: pistachioBaklava },
  { category: 'Dessert', title: 'Colorful French Macarons', image: frenchMacarons },
  { category: 'Dessert', title: 'Ruby Chocolate Mousse Dome', image: rubyChocolateMousse },
  { category: 'Dessert', title: 'Classic Italian Tiramisu', image: classicTiramisu },
  { category: 'Dessert', title: 'Golden Crème Brûlée', image: cremeBrulee },
  { category: 'Dessert', title: 'Fresh Strawberry Shortcake', image: strawberryShortcake },
];

const royalDrinksData: RecipeCardData[] = [
  { category: 'Drink', title: 'Classic Mojito', image: classicMojito },
  { category: 'Drink', title: 'Sunset Tequila Sunrise', image: tequilaSunrise },
  { category: 'Drink', title: 'Chilled Espresso Martini', image: espressoMartini },
  { category: 'Drink', title: 'Vibrant Aperol Spritz', image: aperolSpritz },
  { category: 'Drink', title: 'Smokey Old Fashioned', image: oldFashioned },
  { category: 'Drink', title: 'Spicy Margarita on the Rocks', image: spicyMargarita },
  { category: 'Drink', title: 'Iced Matcha Green Tea Latte', image: icedMatchaLatte },
  { category: 'Drink', title: 'Refreshing Piña Colada', image: pinaColada },
  { category: 'Drink', title: 'Blue Lagoon Cocktail', image: blueLagoon },
];


interface PopularRecipesProps {
  onGenerateRecipe: (dishName: string) => void;
}

const PopularRecipes: React.FC<PopularRecipesProps> = ({ onGenerateRecipe }) => {
  const [showAllReads, setShowAllReads] = useState(false);
  const [showAllDesserts, setShowAllDesserts] = useState(false);
  const [showAllDrinks, setShowAllDrinks] = useState(false);

  const displayedReads = showAllReads ? popularReadsData : popularReadsData.slice(0, 6);
  const displayedDesserts = showAllDesserts ? royalDessertsData : royalDessertsData.slice(0, 3);
  const displayedDrinks = showAllDrinks ? royalDrinksData : royalDrinksData.slice(0, 3);

  return (
    <>
      <section id="popular-recipes" className="my-12 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white/50 backdrop-blur-lg">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-teal/10 via-brand-primary/10 to-brand-orange-dark/10"></div>
        <div className="relative z-10 p-8 md:p-12">
          <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-primary text-center">Popular Reads</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayedReads.map((read, index) => (
              <RecipeCard key={index} recipe={read} onGenerateRecipe={onGenerateRecipe} />
            ))}
          </div>
          {popularReadsData.length > 6 && (
            <div className="text-center mt-8">
              <button 
                onClick={() => setShowAllReads(!showAllReads)}
                className="px-6 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal-dark transition-colors"
              >
                {showAllReads ? 'Show Less' : 'See More'}
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="my-12 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white/50 backdrop-blur-lg">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-teal/10 via-brand-primary/10 to-brand-orange-dark/10"></div>
        <div className="relative z-10 p-8 md:p-12">
          <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-primary text-center">Royal Desserts</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayedDesserts.map((read, index) => (
              <RecipeCard key={index} recipe={read} onGenerateRecipe={onGenerateRecipe} />
            ))}
          </div>
          {royalDessertsData.length > 3 && (
            <div className="text-center mt-8">
              <button 
                onClick={() => setShowAllDesserts(!showAllDesserts)}
                className="px-6 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal-dark transition-colors"
              >
                {showAllDesserts ? 'Show Less' : 'See More'}
              </button>
            </div>
          )}
        </div>
      </section>
      
      <section className="my-12 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white/50 backdrop-blur-lg">
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-teal/10 via-brand-primary/10 to-brand-orange-dark/10"></div>
        <div className="relative z-10 p-8 md:p-12">
          <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-primary text-center">Royal Drinks</h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {displayedDrinks.map((read, index) => (
              <RecipeCard key={index} recipe={read} onGenerateRecipe={onGenerateRecipe} />
            ))}
          </div>
          {royalDrinksData.length > 3 && (
            <div className="text-center mt-8">
              <button 
                onClick={() => setShowAllDrinks(!showAllDrinks)}
                className="px-6 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal-dark transition-colors"
              >
                {showAllDrinks ? 'Show Less' : 'See More'}
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PopularRecipes;