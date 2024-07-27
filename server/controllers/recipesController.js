const axios = require("axios");
const jwt = require("jsonwebtoken");

/* Start n8n workflow using ingredients list provided*/
// POST /api/recipes/suggest
const suggestRecipes = async (req, res) => {
  const { recipe } = req.body; // Receive ingredients list from the front-end

  //to be placed inside n8n later
  const inputprompt = (recipe) => {
    return `Take the input of ingredients (${recipe}) and clean/organize them into a table. If there is no weight or amount listed, then do not include it in the table. Make it short and don't add explanations. If the input is not in English then translate it to English. Do not keep the other language. Using the ingredients in the table, come up with recipes that could be created using these ingredients. Don't include recipes that require any missing ingredients. Each recipe should contain a name, serving amount, kcal, protein, carbs, fat, cooking time, cuisine type (i.e. French, Japanese, Mexican, etc), and number of ingredients from the table that will be required to cook the recipe. Add a step-by-step cooking guide for the recipe. Avoid generic recipes like simple white rice or toast with jam that only require one or two ingredients. Return each recipe as its own JSON object following the format {'Recipe Name': name of recipe, 'ingredients': necessary ingredients with specific amount, 'cooking_guide': specific step-by-step guide for how to make the recipe, 'nutrient_info': calories, protein, carbs, fat of the recipe, 'cooking time': cooking time in minutes, 'cuisine': type of cuisine (i.e. French, Italian, Korean, Russian, etc), 'serving_amount': how many people the recipe can serve}. Make sure that every primitive value in the json object is inside a string, so that arrays are not inside strings.`;
  };

  try {
    // URL of N8n webhook per https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/?utm_source=n8n_app&utm_medium=node_settings_modal-credential_link&utm_campaign=n8n-nodes-base.webhook
    //const webhookUrl = `${process.env.N8N_WEBHOOK_URL}/recommend-recipes`;
    const webhookUrl = process.env.N8N_WEBHOOK_URL_RECIPE;

    //in order to preserve the safety of n8n connection, only tokenized inputs can be read by the n8n.
    const token = jwt.sign({prompt: inputprompt( recipe )}, process.env.JWT_KEY, {
      expiresIn: "5m",
    });

    const response = await axios.post(webhookUrl, { token }, {headers: {apiKey: process.env.N8N_API_KEY}});
    // Send the response back to the client
    res.status(200).json(response.data);
  } catch (error) {
    // Send error response back to the client
    console.error("Error triggering n8n workflow:", error);
    res.status(500).json({ error: "Error triggering n8n workflow" });
  }
};

module.exports = {
  suggestRecipes,
};
