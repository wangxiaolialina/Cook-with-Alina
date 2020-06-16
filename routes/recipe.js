var express = require('express');
var router = express.Router();

const recipeCtrl = require('../controllers/recipe');


router.get('/',recipeCtrl.searchRecipe);

module.exports = router;