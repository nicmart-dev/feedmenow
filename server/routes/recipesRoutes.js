'use strict';

import express from 'express';
import { suggestRecipes, popularCuisines, userPreferences } from '../controllers/recipesController.js';
import { portfolioVisitCheckKey, porfolioVisit } from '../controllers/portfolioVisitController.js';

const router = express.Router();

// POST /api/recipes/suggest
router.post('/suggest', suggestRecipes);

// GET /api/recipes/cuisines
router.get('/cuisines', popularCuisines);

// GET /api/recipes/userpreferences
router.get('/userpreferences', userPreferences);

export default router;
