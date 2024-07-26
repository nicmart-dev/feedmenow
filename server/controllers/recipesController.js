const axios = require("axios");
const jwt = require("jsonwebtoken");

/* Start n8n workflow using ingredients list provided*/
// POST /api/recipes/suggest
const suggestRecipes = async (req, res) => {
  const { prompt } = req.body; // Receive ingredients list from the front-end

  try {
    // URL of N8n webhook per https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/?utm_source=n8n_app&utm_medium=node_settings_modal-credential_link&utm_campaign=n8n-nodes-base.webhook
    //const webhookUrl = `${process.env.N8N_WEBHOOK_URL}/recommend-recipes`;
    const webhookUrl = process.env.N8N_WEBHOOK_URL_RECIP_TEST;
    
    //in order to preserve the safety of n8n connection, only tokenized inputs can be read by the n8n.
    const token = jwt.sign({ prompt }, process.env.JWT_KEY, {
      expiresIn: "5m",
    });
    console.log(token);
    const response = await axios.post(webhookUrl, { token });
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
