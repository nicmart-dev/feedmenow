const axios = require('axios');

/* Start n8n workflow using ingredients list provided*/
// POST /api/recipes/suggest
const suggestRecipes = async (req, res) => {
    const { ingredients } = req.body; // Receive ingredients list from the front-end

    try {
        // URL of N8n webhook per https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/?utm_source=n8n_app&utm_medium=node_settings_modal-credential_link&utm_campaign=n8n-nodes-base.webhook
        const webhookUrl = `${process.env.N8N_WEBHOOK_URL}/recommend-recipes`;
        const response = await axios.post(webhookUrl, { ingredients });

        // Send the response back to the client
        res.status(200).json(response.data);
    } catch (error) {
        // Send error response back to the client
        console.error('Error triggering n8n workflow:', error);
        res.status(500).json({ error: 'Error triggering n8n workflow' });
    }
};

/**
 * Fetches a list of popular cuisines from the the Free Meal API TheMealDB.com API and sends it as a JSON response.
 * API doc: 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A Promise that resolves when the cuisines are sent as a JSON response.
 */
const popularCuisines = async (req, res) => {
    try {
        // Fetch the list of popular cuisines from the API
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');

        // Clean the data by extracting only the cuisine names, and filter out "Unknown" value
        const cuisines = response.data.meals.map(meal => meal.strArea).filter(cuisine => cuisine !== "Unknown");


        // Send the list of cuisines as a JSON response
        res.json(cuisines);
    } catch (error) {
        // If there was an error, log it and send an error response
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch cuisines' });
    }
};

module.exports = {
    suggestRecipes, popularCuisines,
};
