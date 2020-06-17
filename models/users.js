var mongoose = require('mongoose');
const Schema = mongoose.Schema;



var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  googleId: String,
  comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
}, {
  timestamps: true
});

module.exports = mongoose.model('user', userSchema);