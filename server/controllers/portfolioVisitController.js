const {sendFirestoreDataPortfolioSite} = require("./sendFirestoreData.js");
const axios = require("axios");

const portfolioVisitCheckKey = async (req, res, next) => {
    if(req.headers.authorization === process.env.PORTFOLIO_VISIT_TOKEN) {
        next();
    } else {
        res.sendStatus(404); //as if it doesn't exist
    }
}

const porfolioVisit = async (req, res) => {
    try {
        const data = {pathname: req.query.pathname};
        sendFirestoreDataPortfolioSite(data);
        res.status(418).send("I love tea too!");
    } catch(err) {
        res.status(500);
    }
}

module.exports = {
    portfolioVisitCheckKey,
    porfolioVisit,
}