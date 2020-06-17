require('./config/database');
const data = require("./category");

const Category = require('./models/categories');

const p1 = Category.deleteMany({});
p1
.then(function(results) {
  return Category.create(data.category);
})
.then(function() {
  process.exit();
});
