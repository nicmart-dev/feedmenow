'use strict';

import axios from 'axios';

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';
import admin from 'firebase-admin';

const feedmenowAccount = {
    "type": "service_account",
    "project_id": "feedmenow-recipes",
    "client_email": "firebase-adminsdk-fbsvc@feedmenow-recipes.iam.gserviceaccount.com",
    "client_id": "102345094658195957785",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40feedmenow-recipes.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

let cookingTimeOptions = null;
let dietOptions = null;
let intoleranceOptions = null;
let cuisineOptions = null;
let recipesCollectionFeedMeNow = null;

const loadData = async () => {
    const loadCookingTimeOptions = async () => {
        const response = await axios.get(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_COOKINGTIME_ID}`,
            {headers: {Authorization: `Bearer ${process.env.AIRTABLE_READ_ACCESS_TOKEN}`}});
        cookingTimeOptions = response.data.records.map(record => record.fields).sort((a, b) => a.value - b.value);
    };
    const loadDietOptions = async () => {
        const response = await axios.get(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_DIET_ID}`,
            {headers: {Authorization: `Bearer ${process.env.AIRTABLE_READ_ACCESS_TOKEN}`}});
        dietOptions = response.data.records.map(record => record.fields).sort((a, b) => a.value.localeCompare(b.value));
    };
    const loadIntoleranceOptions = async () => {
        const response = await axios.get(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_INTOLERANCE_ID}`,
            {headers: {Authorization: `Bearer ${process.env.AIRTABLE_READ_ACCESS_TOKEN}`}});
        intoleranceOptions = response.data.records.map(record => record.fields).sort((a, b) => a.value.localeCompare(b.value));
    };
    const loadCuisineOptions = async () => {
        // Fetch the list of popular cuisines from the API
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/list.php?a=list');

        // Clean the data by extracting only the cuisine names, and filter out "Unknown" value
        cuisineOptions = response.data.meals.map(meal => meal.strArea).filter(cuisine => cuisine !== "Unknown");
    };

    const loadFirestore = async () => {
        feedmenowAccount['private_key_id'] = process.env.FEEDMENOW_RECIPES_KEY_ID;
        feedmenowAccount['private_key'] = process.env.FEEDMENOW_RECIPES_KEY;

        const app = initializeApp();

        const feedmenowRecipesApp = admin.initializeApp({
            credential: cert(feedmenowAccount)
        }, "FeedMeNowRecipes");

        const db = getFirestore(feedmenowRecipesApp);

        recipesCollectionFeedMeNow = db.collection('GeneratedRecipes');
        console.log("feed-me-now-recipes database initialized");
    };

    try {
        const response = await Promise.all([
            loadDietOptions(),
            loadCookingTimeOptions(),
            loadIntoleranceOptions(),
            loadCuisineOptions(),
            loadFirestore()
        ]);

        return cookingTimeOptions !== null && dietOptions !== null && intoleranceOptions !== null && cuisineOptions !== null && recipesCollectionFeedMeNow !== null;
    } catch (error) {
        console.error(error);
        return false;
    }
}

//return hard copies of arrays
const getCookingTimeSettings = () => {
    return structuredClone(cookingTimeOptions);
}

const getIntoleranceOptions = () => {
    return structuredClone(intoleranceOptions);
}

const getDietOptions = () => {
    return structuredClone(dietOptions);
}

const getCuisineOptions = () => {
    return structuredClone(cuisineOptions);
}

const getFeedMeNowRecipes = async (recipeFirestoreID) => {
    const dishesResponse = await recipesCollectionFeedMeNow.doc(`${recipeFirestoreID}`).get();

    if(dishesResponse.exists){
        return dishesResponse.data();
    } else
        return {
            "error": "Data does not exist"
        };
}

export {
    loadData,
    getCookingTimeSettings,
    getIntoleranceOptions,
    getDietOptions,
    getCuisineOptions,
    getFeedMeNowRecipes
};