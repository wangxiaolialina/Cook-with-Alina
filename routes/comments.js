var express = require('express');
var router = express.Router();

commentCtrl = require('../controllers/comment');

router.post('/',commentCtrl.createComment);

module.exports = router;