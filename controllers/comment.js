const Comment = require('../models/comments');
const User = require('../models/users');
const {
    render
} = require('../server');
const recipe = require('../models/recipe');

module.exports = {
    createComment,
    editComment,
    deleteComment,
}

function createComment(req, res, next) {
    if (!User) {
        render('/')
    } else {

        const comment = new Comment({
            text: req.body.user_comment,
            recipe_uri: req.body.recipe_uri,
            user_id: req.user
        });

        comment.save().then(() => {
                res.render('show');
            })
            .catch(err => {
                next(err)
            })
    }
}

function editComment(req, res) {
    const filter = {
        _id: req.params.id,
        user_id: req.user_id
    }
    const update = {
        text: req.body.text
    }

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