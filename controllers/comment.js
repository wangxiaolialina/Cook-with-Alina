const Comment = require('../models/comments');
const User = require('../models/users');
const recipe = require('../models/recipe');

module.exports = {
    createComment,
    editComment,
    deleteComment,
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
            user_id: req.user._id
        });
        console.log('here is the reqbody:', req.body)

        comment.save().then(() => {
                res.redirect(`recipe/${req.body.search_name}`);
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
        text: req.body.text
    }
    Comment.findOneAndUpdate({},update)
    Comment.findOneAndUpdate(filter, update, (err, doc) => {
        if (err) {
            res.sendStatus(400);
        }

        res.sendStatus(202);
    });
}

function deleteComment(req, res) {
    const filter = {
        _id: req.params.id,
        user_id: req.user_id
    }
    Comment.findOneAndDelete(filter, (err, doc) => {
        if (err) {
            res.sendStatus(400);
        }

        res.sendStatus(200);
    });
}