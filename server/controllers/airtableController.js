const axios = require("axios");

let cookingTimeSettings = null;
let dietSettings = null;
let toleranceSettings = null;

const loadData = async () => {
    const loadCookingTimeSettings = async () => {
        const response = await axios.get(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_COOKINGTIME_ID}`,
            {headers: {Authorization: `Bearer ${process.env.AIRTABLE_READ_ACCESS_TOKEN}`}});
        cookingTimeSettings = response.data.records.map(record => record.fields).sort((a, b) => a.value - b.value);
    };
    const loadDietSettings = async () => {
        const response = await axios.get(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_DIET_ID}`,
            {headers: {Authorization: `Bearer ${process.env.AIRTABLE_READ_ACCESS_TOKEN}`}});
        dietSettings = response.data.records.map(record => record.fields).sort((a, b) => a.value.localeCompare(b.value));
    };
    const loadToleranceSettings = async () => {
        const response = await axios.get(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_INTOLERANCE_ID}`,
            {headers: {Authorization: `Bearer ${process.env.AIRTABLE_READ_ACCESS_TOKEN}`}});
        toleranceSettings = response.data.records.map(record => record.fields).sort((a, b) => a.value.localeCompare(b.value));
    };

    try {
        const response = await Promise.all([
            loadDietSettings(),
            loadCookingTimeSettings(),
            loadToleranceSettings()
        ]);

        return cookingTimeSettings !== null && dietSettings !== null && toleranceSettings !== null;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    loadData,
    cookingTimeSettings,
    dietSettings,
    toleranceSettings
};