const express = require('express');
const { suggestRecipes, popularCuisines } = require('../controllers/recipesController.js');

const router = express.Router();

// POST /api/recipes/suggest
router.post('/suggest', suggestRecipes);

// GET /api/recipes/cuisines
router.get('/cuisines', popularCuisines);

module.exports = router;
