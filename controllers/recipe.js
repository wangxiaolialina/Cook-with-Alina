const axios = require('axios');
const recipeModel = require('../models/recipe');
const Recipe = recipeModel.Recipe;
const base_url = "https://api.edamam.com/search";
require('dotenv').config();

module.exports = {
    searchRecipe,
    getRecipeByName,
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

function getRecipeByName(req, res) {
    const recipe_name = req.params.name;
    axios.get(base_url, {
        params: {
            app_id: app_id,
            app_key: app_key,
            q: recipe_name,
        }
    })
        .then((response) => {
           if (response && response.data.hits.length > 0) {
                let recipe = new Recipe(response.data.hits[0].recipe);

                res.render('show',{recipe:recipe});
            }
        })
        .catch((err) => {
            res.sendStatus(500);
        });
}