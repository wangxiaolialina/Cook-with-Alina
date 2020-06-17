const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    recipe_uri: {type: String, required: true},
    user_id: {type: Schema.Types.ObjectId, ref: 'Users'}
  }
);

module.exports = mongoose.model('comment', CommentSchema);