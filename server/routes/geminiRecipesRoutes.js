const router = require("express").Router();
const geminiRecipesControllerecipesController = require("../controllers/geminiRecipesController");

router.route("/").get(geminiRecipesControllerecipesController.getAllRecipes);

module.exports = router;
