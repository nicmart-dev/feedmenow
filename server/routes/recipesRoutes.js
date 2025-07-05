'use strict';

import express from 'express';
import { suggestRecipes, popularCuisines, userPreferences } from '../controllers/recipesController.js';

const router = express.Router();

// POST /api/v1/recipes/suggest
router.post('/suggest', suggestRecipes);

// GET /api/v1/recipes/cuisines
router.get('/cuisines', popularCuisines);

// GET /api/v1/recipes/userpreferences
router.get('/userpreferences', userPreferences);

export default router;
