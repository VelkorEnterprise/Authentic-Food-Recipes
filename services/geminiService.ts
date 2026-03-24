import { GoogleGenAI, Type, Modality } from "@google/genai";
import { Recipe, Nutrition } from '../types';

// Initialize GoogleGenAI with apiKey from environment variables as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

// Define a schema for the recipe object for consistent JSON output.
const nutritionSchema = {
  type: Type.OBJECT,
  properties: {
    calories: { type: Type.STRING, description: "Estimated total calories (e.g., '550 kcal')." },
    protein: { type: Type.STRING, description: "Estimated total protein (e.g., '30g')." },
    carbohydrates: { type: Type.STRING, description: "Estimated total carbohydrates (e.g., '45g')." },
    fat: { type: Type.STRING, description: "Estimated total fat (e.g., '20g')." },
  },
  required: ['calories', 'protein', 'carbohydrates', 'fat'],
};

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    recipeName: { type: Type.STRING, description: "The name of the recipe." },
    description: { type: Type.STRING, description: "A short, enticing description of the dish that mentions the main ingredients or cuisine style." },
    prepTime: { type: Type.STRING, description: "Estimated preparation time in ISO 8601 duration format (e.g., 'PT15M' for 15 minutes)." },
    cookTime: { type: Type.STRING, description: "Estimated cooking time in ISO 8601 duration format (e.g., 'PT30M' for 30 minutes)." },
    totalTime: { type: Type.STRING, description: "The estimated total cooking time in a user-friendly format (e.g., '45 minutes')." },
    recipeYield: { type: Type.STRING, description: "The number of servings this recipe makes (e.g., '4 servings', 'Makes 12 cookies')." },
    suitableForDiet: { type: Type.STRING, description: "A comma-separated list of applicable diets from Schema.org's Diet enumeration (e.g., 'GlutenFreeDiet,VegetarianDiet'). This is optional; omit if not applicable." },
    ingredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of ingredients with quantities."
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of step-by-step cooking instructions."
    },
    nutrition: { ...nutritionSchema, description: "Estimated nutritional information per serving." },
  },
  required: ['recipeName', 'description', 'prepTime', 'cookTime', 'totalTime', 'recipeYield', 'ingredients', 'instructions', 'nutrition'],
};

export interface RecipeRequest {
  ingredients: string;
  servingSize: string;
  cuisine: string;
  difficulty: string;
  cookingTime: string;
  dietaryPreferences: string;
}

export const generateRecipe = async (request: RecipeRequest): Promise<Recipe> => {
  const { ingredients, servingSize, cuisine, difficulty, cookingTime, dietaryPreferences } = request;

  // SEO Enhancement: Prompt is engineered for more descriptive and useful output.
  let prompt = `Create a delicious, creative, and authentic recipe. Your response MUST be in JSON format and adhere to the provided schema.

- Primary Goal: Generate a recipe for "${ingredients}".
- If the goal seems to be a list of ingredients instead of a dish name, create a recipe that creatively combines them.
- Always include common pantry staples if they are necessary to complete the recipe.
- IMPORTANT: Provide estimated nutritional information (calories, protein, carbohydrates, fat) per serving. This is a critical part of the output.
- ALSO IMPORTANT: Provide 'prepTime' and 'cookTime' in ISO 8601 duration format (e.g., 'PT20M'). Provide 'totalTime' in a user-friendly format (e.g., '35 minutes').
- ALSO IMPORTANT: Provide 'recipeYield' (e.g., '4 servings').
- If applicable, specify 'suitableForDiet' as a comma-separated list from Schema.org Diet types (e.g., 'GlutenFreeDiet,VegetarianDiet'). If no specific diet is relevant, omit this field.

Recipe Constraints:
`;

  if (servingSize && servingSize !== 'any') {
    prompt += `- Serving Size: ${servingSize}\n`;
  }
  if (cuisine && cuisine !== 'any') {
    prompt += `- Cuisine: ${cuisine}\n`;
  }
  if (difficulty && difficulty !== 'any') {
    prompt += `- Difficulty: ${difficulty}\n`;
  }
  if (cookingTime && cookingTime !== 'any') {
    prompt += `- Total Cooking Time: ${cookingTime}\n`;
  }
  if (dietaryPreferences) {
    prompt += `- Dietary Preferences: ${dietaryPreferences}\n`;
  }

  // Fallback prompt if the form is submitted empty
  if (!ingredients && !dietaryPreferences && servingSize === 'any' && cuisine === 'any' && difficulty === 'any' && cookingTime === 'any') {
      prompt = 'Generate a recipe for a popular and delicious dish that is easy to make. Provide a full recipe including estimated nutritional information per serving, prep/cook/total times, yield, and dietary info.';
  }


  try {
    // Use ai.models.generateContent to generate recipe content with a JSON schema.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    // Directly access response.text and parse it as JSON, as per guidelines.
    const text = response.text;
    if (!text) {
      throw new Error("API response was empty. The model might not have been able to generate a recipe with the provided input.");
    }

    const recipe = JSON.parse(text.trim()) as Recipe;
    return recipe;

  } catch (error) {
    console.error("Error generating recipe:", error);

    if (error instanceof Error) {
        let userMessage = "Sorry, I couldn't create a recipe right now. Please try again.";

        const errorMessage = error.message.toLowerCase();

        if (errorMessage.includes("api key not valid")) {
            userMessage = "There seems to be an issue with the API configuration. Please contact support.";
        } else if (errorMessage.includes("quota") || errorMessage.includes("rate limit")) {
            userMessage = "We're experiencing high demand! Please wait a moment and try generating your recipe again.";
        } else if (errorMessage.includes("prompt was blocked") || errorMessage.includes("candidate was blocked")) {
            userMessage = "Your request could not be processed due to safety settings. Please try different ingredients or a less specific dish name.";
        } else if (errorMessage.includes("json")) {
             userMessage = "The AI had trouble creating a recipe with that combination. Could you try being a little more specific or different with your ingredients?";
        }

        throw new Error(userMessage);
    }
    
    throw new Error("An unknown error occurred while generating the recipe.");
  }
};

export const generateImage = async (recipeName: string): Promise<string> => {
  try {
    // A high-quality, descriptive prompt template for better image results.
    const descriptivePrompt = `A professional, ultra-realistic food photograph of "${recipeName}". The dish should be beautifully plated on a stylish, clean surface. Use dramatic, soft lighting to highlight the textures of the food. The background should be subtly blurred to keep the focus on the dish. The overall mood should be appetizing, modern, and high-end.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [{ text: descriptivePrompt }],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
    }
    
    throw new Error('No image was generated.');

  } catch (error) {
    console.error('Error generating image:', error);

    if (error instanceof Error) {
        let userMessage = "Sorry, I couldn't create an image for your recipe. The recipe text is still available!";

        const errorMessage = error.message.toLowerCase();

        if (errorMessage.includes("api key not valid")) {
            userMessage = "There seems to be an issue with the API configuration. Please contact support.";
        } else if (errorMessage.includes("quota") || errorMessage.includes("rate limit")) {
            userMessage = "We're experiencing high demand for images! Please wait a moment and try again.";
        } else if (errorMessage.includes("prompt was blocked") || errorMessage.includes("image generation is not available")) {
            userMessage = "The image for this recipe could not be created due to safety or content restrictions. Please try a different recipe.";
        }

        throw new Error(userMessage);
    }
    
    throw new Error('An unknown error occurred while generating the image.');
  }
};