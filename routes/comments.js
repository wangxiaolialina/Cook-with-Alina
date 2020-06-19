var express = require('express');
var router = express.Router();

commentCtrl = require('../controllers/comment');

router.get('/:id', commentCtrl.showEdit);
router.post('/',commentCtrl.createComment);
router.delete('/:id', commentCtrl.deleteComment);
router.put('/:id', commentCtrl.editComment);

module.exports = router;