const express = require('express');
const { suggestRecipes, popularCuisines, notEating } = require('../controllers/recipesController.js');

const router = express.Router();

// POST /api/food/suggest
router.post('/suggest', suggestRecipes);

// GET /api/food/cuisines
router.get('/cuisines', popularCuisines);

// GET /api/food/noteating
router.get('/noteating', notEating);

module.exports = router;
