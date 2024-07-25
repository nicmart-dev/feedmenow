const express = require('express');
const { suggestRecipes, popularCuisines } = require('../controllers/recipesController.js');

const router = express.Router();

// POST /api/food/suggest
router.post('/suggest', suggestRecipes);

// GET /api/food/cuisines
router.get('/cuisines', popularCuisines);

module.exports = router;
