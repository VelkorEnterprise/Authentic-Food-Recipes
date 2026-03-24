export interface Nutrition {
  calories: string;
  protein: string;
  carbohydrates: string;
  fat: string;
}

export interface Recipe {
  recipeName: string;
  description: string;
  prepTime: string; // ISO 8601 format, e.g., "PT15M"
  cookTime: string; // ISO 8601 format, e.g., "PT30M"
  totalTime: string; // User-friendly format for display, e.g., "45 minutes"
  recipeYield: string; // e.g., "4 servings"
  suitableForDiet?: string; // Comma-separated, e.g., "GlutenFreeDiet,VegetarianDiet"
  ingredients: string[];
  instructions: string[];
  nutrition: Nutrition;
}
