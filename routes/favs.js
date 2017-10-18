//routes/messages.js
var express = require('express');
var controller = require('../controllers/favController');
var passport = require('passport');
var router = express.Router();

router.get('/', controller.plain);
router.post('/:id', controller.newFav);
router.post('/delete/:id', controller.removeFav);

module.exports = router;
