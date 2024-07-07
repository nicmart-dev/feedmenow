const express = require('express');
const { suggestRecipes } = require('../controllers/recipesController.js');

const router = express.Router();

// POST /api/recipes/suggest
router.post('/suggest', suggestRecipes);

module.exports = router;
