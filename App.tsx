import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { generateRecipe, generateImage, RecipeRequest } from './services/geminiService';
import { Recipe } from './types';
import Hero from './components/Hero';
import PopularRecipes from './components/PopularReads';
import WelcomePlaceholder from './components/WelcomePlaceholder';
import RecipeSkeleton from './components/RecipeSkeleton';
import ErrorMessage from './components/ErrorMessage';
import RecipeDisplay from './components/RecipeDisplay';
import RecipeSections from './components/RecipeSections';
import { createRecipeHtml } from './services/htmlGenerator';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import KnowledgeNugget from './components/KnowledgeNugget';

const Testimonials = lazy(() => import('./components/Testimonials'));
const ProofSection = lazy(() => import('./components/ProofSection'));
const AuthoritySection = lazy(() => import('./components/AuthoritySection'));

function App() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recipeResultRef = useRef<HTMLDivElement>(null);
  const generatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cleanup old schemas
    const oldRecipeSchema = document.getElementById('recipe-schema');
    if (oldRecipeSchema) oldRecipeSchema.remove();
    const oldBreadcrumbSchema = document.getElementById('breadcrumb-schema');
    if (oldBreadcrumbSchema) oldBreadcrumbSchema.remove();

    // Create a base breadcrumb schema
    const breadcrumbScript = document.createElement('script');
    breadcrumbScript.id = 'breadcrumb-schema';
    breadcrumbScript.type = 'application/ld+json';
    const breadcrumbBase = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [{
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': window.location.origin
      },{
        '@type': 'ListItem',
        'position': 2,
        'name': 'Recipe Generator',
        'item': `${window.location.origin}/#generator`
      }]
    };

    if (recipe) {
      document.title = `${recipe.recipeName} | Authentic Food Recipes`;
      
      // Add recipe schema
      const recipeScript = document.createElement('script');
      recipeScript.id = 'recipe-schema';
      recipeScript.type = 'application/ld+json';
      const recipeSchema = {
        '@context': 'https://schema.org/',
        '@type': 'Recipe',
        name: recipe.recipeName,
        description: recipe.description,
        image: imageUrl ? [{
          '@type': 'ImageObject',
          'url': imageUrl,
          'height': '1024',
          'width': '1024'
        }] : [],
        author: { '@type': 'Organization', name: 'Authentic Food Recipes' },
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        totalTime: recipe.totalTime,
        recipeYield: recipe.recipeYield,
        recipeIngredient: recipe.ingredients,
        recipeInstructions: recipe.instructions.map(step => ({ '@type': 'HowToStep', text: step })),
        nutrition: {
          '@type': 'NutritionInformation',
          calories: recipe.nutrition.calories,
          proteinContent: recipe.nutrition.protein,
          carbohydrateContent: recipe.nutrition.carbohydrates,
          fatContent: recipe.nutrition.fat,
        },
        suitableForDiet: recipe.suitableForDiet ? recipe.suitableForDiet.split(',') : undefined,
      };
      recipeScript.textContent = JSON.stringify(recipeSchema, null, 2);
      document.head.appendChild(recipeScript);

      // Add recipe to breadcrumb schema
      breadcrumbBase.itemListElement.push({
        '@type': 'ListItem',
        'position': 3,
        'name': recipe.recipeName,
        'item': window.location.href // Current URL
      });

    } else {
      document.title = 'Authentic Food Recipes | AI Recipe Generator';
    }
    
    breadcrumbScript.textContent = JSON.stringify(breadcrumbBase, null, 2);
    document.head.appendChild(breadcrumbScript);

    return () => {
      const schemaOnCleanup = document.getElementById('recipe-schema');
      if (schemaOnCleanup) schemaOnCleanup.remove();
      const breadcrumbOnCleanup = document.getElementById('breadcrumb-schema');
      if (breadcrumbOnCleanup) breadcrumbOnCleanup.remove();
    };
  }, [recipe, imageUrl]);

  const handleReset = () => {
    setRecipe(null);
    setImageUrl(null);
    setIsLoading(false);
    setIsDownloading(false);
    setError(null);
    // Scroll to top to ensure user sees the reset state
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGenerateRecipe = async (request: RecipeRequest) => {
    setIsLoading(true);
    setError(null);
    setRecipe(null);
    setImageUrl(null);
    recipeResultRef.current?.scrollIntoView({ behavior: 'smooth' });

    try {
      const [generatedRecipe, generatedImageUrl] = await Promise.all([
        generateRecipe(request),
        generateImage(request.ingredients || "a delicious dish")
      ]);
      setRecipe(generatedRecipe);
      setImageUrl(generatedImageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        recipeResultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  
  const handlePopularReadClick = (dishName: string) => {
    const request: RecipeRequest = {
      ingredients: dishName,
      servingSize: 'any', cuisine: 'any', difficulty: 'any',
      cookingTime: 'any', dietaryPreferences: ''
    };
    handleGenerateRecipe(request);
  };
  
  const handleDownload = () => {
    if (!recipe) return;
    setIsDownloading(true);
    try {
      const htmlContent = createRecipeHtml(recipe, imageUrl);
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const link = document.createElement('a');
      const fileName = `${recipe.recipeName.replace(/\s+/g, '_').toLowerCase()}_recipe.html`;
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error("Error creating HTML file:", error);
      setError("Sorry, we couldn't create the download file. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handleShare = async () => {
    if (!recipe) return;
    const canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const shareUrl = canonicalLink ? canonicalLink.href : window.location.origin;
    const shareData = {
      title: `Check out this recipe for ${recipe.recipeName}!`,
      text: recipe.description,
      url: shareUrl,
    };
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.error('Error sharing:', err);
      navigator.clipboard.writeText(`Check out this amazing recipe for ${recipe.recipeName} at ${shareUrl}`);
      alert('Recipe link copied to clipboard!');
    }
  };

  return (
    <div className="bg-slate-50 font-sans text-slate-900 min-h-screen">
      <Navbar onReset={handleReset} />
      <main className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-8">
        <Hero />
        
        <section ref={generatorRef} id="generator" className="my-12 relative text-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white/50 backdrop-blur-lg">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-teal/10 via-brand-primary/10 to-brand-orange-dark/10"></div>
            <div className="relative z-10 p-8 md:p-12 flex flex-col items-center">
                <div className="text-center">
                  <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-primary">Create Your Custom Recipe</h2>
                  <p className="text-slate-600 mb-8 max-w-2xl text-lg">Enter ingredients you have, or the name of a dish you're craving, and customize it to your liking.</p>
                </div>
                <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-xl w-full max-w-2xl border border-white/50">
                  <RecipeSections onGenerate={handleGenerateRecipe} isLoading={isLoading} />
                </div>
            </div>
        </section>

        <section ref={recipeResultRef} id="recipe-display" className="my-12">
          {isLoading && <RecipeSkeleton />}
          {error && !isLoading && <ErrorMessage message={error} />}
          {recipe && !isLoading && (
            <div className="phantom-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <RecipeDisplay 
                recipe={recipe} 
                imageUrl={imageUrl}
                onDownload={handleDownload} 
                onShare={handleShare}
                isDownloading={isDownloading}
              />
            </div>
          )}
        </section>

        <section className="my-12 relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-white/50 backdrop-blur-lg">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-teal/10 via-brand-primary/10 to-brand-orange-dark/10"></div>
            <div className="relative z-10 p-8 md:p-12 text-center text-slate-900">
                <h2 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-primary">Welcome to Authentic Food Recipes!</h2>
                <div className="max-w-2xl mx-auto bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50">
                    <WelcomePlaceholder />
                </div>
            </div>
        </section>
        
        <PopularRecipes onGenerateRecipe={handlePopularReadClick} />
        
        <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
          <ProofSection />
          <AuthoritySection />
          <Testimonials />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;