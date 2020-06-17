var express = require('express');
var router = express.Router();

const recipeCtrl = require('../controllers/recipe');
const commentCtrl = require('../controllers/comment')


router.get('/',recipeCtrl.searchRecipe);
router.get('/:name',recipeCtrl.getRecipeByName);
router.post('/:name',commentCtrl.createComment);

module.exports = router;