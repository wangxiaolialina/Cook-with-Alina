const axios = require('axios');
const category = require('../models/categories')
const recipeModel = require('../models/recipe');
const Recipe = recipeModel.Recipe;
const base_url = "https://api.edamam.com/search";

module.exports = {
    index,
    searchCategory,
}

const app_id = process.env.APP_ID;
const app_key = process.env.APP_KEY;

async function index(req, res, next) {
    try {

        const categories = await category.find({});
        res.render('category', {
            categories
        });
    } catch (err) {
        next(err);
    }
}


function searchCategory(req, res) {

    category.findOne({
        name: req.params.category
    }).then(result => {
        return axios.get(base_url, {
            params: {
                app_id: app_id,
                app_key: app_key,
                q: result.searchKey,
                from: 0,
                to: 10,
            }
        })
    }).then(result => {
        let data = result.data;
        let recipeList = data.hits.map(result => {
            return new Recipe(result.recipe)
        })
        // res.send(recipeList);
        res.render('recipe', {
            recipeList
        });
    }).catch(err => {
        res.send(err.message);
    })
}