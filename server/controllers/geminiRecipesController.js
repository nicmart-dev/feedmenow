const { PORT } = process.env || 8080;
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Get all projects
const getAllRecipes = async (_req, res) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt =
    "Take the input of ingredients (5 eggs, 2 packs cherry tomatoes, 1 loaf whole wheat bread, sesame seeds, dried alpaca meat, garlic, salt, olive oil, potatoes, tortilla chips 500g, 1kg white rice, kimchi, instant ramen, rosemary) and clean/organize them into a table. If there is no weight or amount listed, then do not include it in the table. Make it short and don't add explanations. If the input is not in English then translate it to English. Do not keep the other language. Using the ingredients in the table, come up with recipes that could be created using these ingredients. Don't include recipes that require any missing ingredients. Each recipe should contain a name, serving amount, kcal, protein, carbs, fat, cooking time, cuisine type (i.e. French, Japanese, Mexican, etc), and number of ingredients from the table that will be required to cook the recipe. Add a step-by-step cooking guide for the recipe. Avoid generic recipes like simple white rice or toast with jam that only require one or two ingredients. Return each recipe as its own JSON object following the format {'Recipe Name': name of recipe, 'ingredients': necessary ingredients with specific amount, 'cooking_guide': specific step-by-step guide for how to make the recipe, 'nutrient_info': calories, protein, carbs, fat of the recipe, 'cooking time': cooking time in minutes, 'cuisine': type of cuisine (i.e. French, Italian, Korean, Russian, etc), 'serving_amount': how many people the recipe can serve}.";

  const result = await model.generateContent(prompt);
  const response = await result.response;

  let text = response.text().replace(/(?:```json)/gm, "");
  text = "[" + text.replace(/(?:```)/gm, ",").slice(0, -2) + "]";

  res.status(200).send(text);
};

module.exports = { getAllRecipes };
