'use strict';

import axios from 'axios';
import jwt from 'jsonwebtoken';
import {nanoid} from 'nanoid';
import {getCookingTimeSettings, getDietOptions, getIntoleranceOptions, getCuisineOptions} from './databaseController.js';

/* Start n8n workflow using ingredients list provided*/
// POST /api/recipes/suggest
const suggestRecipes = async (req, res) => {
    const { ingredients, settings } = req.body; // Receive ingredients list from the front-end
  try {
    // URL of N8n webhook per https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/?utm_source=n8n_app&utm_medium=node_settings_modal-credential_link&utm_campaign=n8n-nodes-base.webhook
    const webhookUrl = `${process.env.N8N_WEBHOOK_URL}/recommend-recipes`;

    //in order to preserve the safety of n8n connection, only tokenized inputs can be read by the n8n.
    const token = jwt.sign({prompt: ingredients, settings: settings}, process.env.JWT_KEY, {
      expiresIn: "5m",
    });
    // Send the response back to the client
    const response = await axios.post(webhookUrl, { token }, {headers: {apiKey: process.env.N8N_API_KEY}});

    response.data[0].prompt = ingredients;
    //adds a randomly generated id to the item, which is also used for page id of the recipe in the client.
    response.data[0].dishes.map((item) => {
      item["id"] = nanoid(16);
    });

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
        // Send the list of cuisines as a JSON response
        res.json(getCuisineOptions());
    } catch (error) {
        // If there was an error, log it and send an error response
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch cuisines' });
    }
};

const userPreferences = async (req, res) => {
    try {
        const userPreferences = {
            cookingTime: getCookingTimeSettings(),
            diet: getDietOptions(),
            intolerance: getIntoleranceOptions(),
        }
        res.json(userPreferences);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user preferences' });
    }
}

export {
    suggestRecipes,
    popularCuisines,
    userPreferences
};
