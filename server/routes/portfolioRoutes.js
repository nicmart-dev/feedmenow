import express from 'express';
import { portfolioVisitCheckKey, porfolioVisit } from "../controllers/portfolioVisitController.js";

const router = express.Router();

//GET
router.get('/portfolio-site-visit', portfolioVisitCheckKey, porfolioVisit);

export default router;
