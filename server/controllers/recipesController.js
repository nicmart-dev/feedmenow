'use strict';

import axios from 'axios';
import jwt from 'jsonwebtoken';
import {nanoid} from 'nanoid';
import {getCookingTimeSettings, getDietOptions, getIntoleranceOptions, getCuisineOptions, getFeedMeNowRecipes} from './databaseController.js';
import {response} from "express";

/* Start n8n workflow using ingredients list provided*/
// POST /api/v1/recipes/suggest
const suggestRecipes = async (req, res) => {

    const { ingredients, settings } = req.body; // Receive ingredients list from the front-end

  try {
    // URL of N8n webhook per https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/?utm_source=n8n_app&utm_medium=node_settings_modal-credential_link&utm_campaign=n8n-nodes-base.webhook
    const webhookUrl = `${process.env.N8N_WEBHOOK_URL}/recommend-recipes-v2`;

    const nid = nanoid(16);

    //in order to preserve the safety of n8n connection, only tokenized inputs can be read by the n8n.
    const token = jwt.sign({prompt: ingredients, settings: settings, promptid: nid}, process.env.JWT_KEY, {
      expiresIn: "5m",
    });

    // Send the response back to the client
    const response = await axios.post(webhookUrl, { token }, {headers: {apiKey: process.env.N8N_API_KEY}});

    res.status(200).json(response.data);
  } catch (error) {
        // Send error response back to the client
        console.error('Error triggering n8n workflow:\n', error);
        res.status(500).json({ error: 'Error triggering n8n workflow' });
  }
};

//TODO: Add nanoID to every single recipe, here, so that client could open all the pages.
const getRecipes = async (req, res) => {
    const { query } = req;

    try {
        const responseAirtable = await axios.get(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_GENERATED_RECIPES_ID}?filterByFormula={nanoID}="${query.nanoid}"`,
            {headers: {Authorization: `Bearer ${process.env.AIRTABLE_READ_ACCESS_TOKEN}`}});

        if(responseAirtable.data.records[0].fields.status == "Success") {
            const firestoreID = responseAirtable.data.records[0].fields.firestoreID.slice(0, -1);
            const promptID = responseAirtable.data.records[0].fields.nanoID;

            const responseFirestore = await getFeedMeNowRecipes(firestoreID);
            if (responseFirestore['error']) {
                res.status(500).json(responseFirestore);
            } else {
                for (let i = 0; i < responseFirestore.dishes.length; i++) {
                    responseFirestore.dishes[i]['id'] = promptID + '-' + String(i);
                }

                res.status(200).json(responseFirestore);
            }
        } else if(responseAirtable.data.records[0].fields.status == "Generating"){
            res.status(200).json({status: "The recipes are being generated."});
        } else {
            throw new Error('n8n workflow failed to generate recipes.');
        }
    } catch(e) {
        console.error(e);
        res.status(500).json({ error: 'Error getting recipes.' });
    }
}

/**
 * Fetches a list of popular cuisines from the the Free Meal API TheMealDB.com API and sends it as a JSON response.
 * API doc:
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @return {Promise<void>} - A Promise that resolves when the cuisines are sent as a JSON response.
 */
// GET /api/v1/recipes/cuisines
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

// GET /api/v1/userpreferences
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
    userPreferences,
    getRecipes
};
