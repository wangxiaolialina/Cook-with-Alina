const axios = require('axios');
const recipeModel = require('../models/recipe');
const Recipe = recipeModel.Recipe;
const base_url = "https://api.edamam.com/search";
require('dotenv').config();

module.exports = {
    searchRecipe
}

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

async function searchRecipe(req, res ) {
    try {
        const response = await axios.get(base_url, {
            params: {
                app_id: app_id,
                app_key: app_key,
                q: req.query.recipeName,
                from: 0,
                to: 10,
            }
        })
        if (response && response.data.hits.length > 0) {
            let data = response.data;
            let recipeList = data.hits.map(result => {
                return new Recipe(result.recipe)
            })
            // res.send(recipeList);
            res.render('recipe',{recipeList});
        }
    }  catch (error) {
        res.sendStatus(500)
    }
}