const express = require('express');
const { portfolioVisitCheckKey, porfolioVisit } = require("../controllers/portfolioVisitController.js");
const { suggestRecipes, popularCuisines, userPreferences } = require('../controllers/recipesController.js');

const router = express.Router();

// POST /api/recipes/suggest
router.post('/suggest', suggestRecipes);

// GET /api/recipes/cuisines
router.get('/cuisines', popularCuisines);

// GET /api/recipes/userpreferences
router.get('/userpreferences', userPreferences);

module.exports = router;
