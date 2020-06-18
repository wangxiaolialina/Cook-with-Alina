var express = require('express');
var router = express.Router();

const recipeCtrl = require('../controllers/recipe');


router.get('/',recipeCtrl.searchRecipe);
router.get('/:name',recipeCtrl.getRecipeByName);

module.exports = router;