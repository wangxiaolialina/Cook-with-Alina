var express = require('express');
var router = express.Router();

categoryCtrl = require('../controllers/category');

router.get('/',categoryCtrl.index);
router.get('/:category', categoryCtrl.searchCategory)
module.exports = router;