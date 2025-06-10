const axios = require("axios");

let cookingTimeOptions = null;
let dietOptions = null;
let intoleranceOptions = null;
let cuisineOptions = null;

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
    }

    try {
        const response = await Promise.all([
            loadCookingTimeOptions(),
            loadDietOptions(),
            loadIntoleranceOptions(),
            loadCuisineOptions()
        ]);

        return cookingTimeOptions !== null && dietOptions !== null && intoleranceOptions !== null && cuisineOptions !== null;
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

module.exports = {
    loadData,
    getCookingTimeSettings,
    getIntoleranceOptions,
    getDietOptions,
    getCuisineOptions,
};