const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    searchKey: {type: String },
    img: { type: String },
  }
);

module.exports = mongoose.model('category', categorySchema);