const Comment = require('../models/comments');
const User = require('../models/users');
const recipe = require('../models/recipe');

module.exports = {
    showEdit,
    createComment,
    editComment,
    deleteComment,
}

function showEdit(req, res) {
    Comment.findById(req.params.id, (err, comment) => {
        if(err){
            res.send(err.message);
        }

        res.render("edit", {
            comment,
            user: req.user,
            recipe: {name: req.query.recipe_name}
        })
    })
}

function createComment(req, res, next) {
    //req.user
    //req.body 
    //req.body.recipe_name
    if (!req.user) {
        res.redirect('/auth/google');
    } else {
        const comment = new Comment({
            text: req.body.user_comment,
            recipe_uri: req.body.recipe_uri,
            user_id: req.user._id,
            user_name: req.user.name,
        });
        console.log('here is the reqbody:', req.body)

        comment.save().then(() => {
                res.redirect(`/recipe/${req.body.search_name}`);
            })
            .catch(err => {
                next(err)
            })
    }
}

function editComment(req, res) {
    const filter = {
        _id: req.params.id,
        user_id: req.user._id
    }
    const update = {
        text: req.body.user_comment
    }
    Comment.findOneAndUpdate({},update)
    Comment.findOneAndUpdate(filter, update, (err, doc) => {
        if (err) {
            res.sendStatus(400);
        }

        res.redirect(`/recipe/${req.body.search_name}`);
    });
}

function deleteComment(req, res) {
    const filter = {
        _id: req.params.id,
        user_id: req.user._id
    }
    Comment.findOneAndDelete(filter, (err, doc) => {
        if (err) {
            res.sendStatus(400);
        }

        res.redirect(`/recipe/${req.body.search_name}`);
    });
}