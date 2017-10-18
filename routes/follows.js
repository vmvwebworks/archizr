//routes/messages.js
var express = require('express');
var controller = require('../controllers/followController');
var passport = require('passport');
var router = express.Router();

router.get('/', controller.plain);
router.post('/:id', controller.newFollow);
router.post('/delete/:id', controller.unFollow);

module.exports = router;
