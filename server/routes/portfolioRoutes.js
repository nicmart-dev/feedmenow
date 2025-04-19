const express = require('express');
const { portfolioVisitCheckKey, porfolioVisit } = require("../controllers/portfolioVisitController.js");

const router = express.Router();

//
router.get('/portfolio-site-visit', portfolioVisitCheckKey, porfolioVisit);

module.exports = router;
