var express = require('express');
var passport = require('passport');
//var Account = require('../models/accounts');
var router = express.Router();
var controller = require('../controllers/indexController');
/* GET home page. */
router.get('/', controller.plain);
module.exports = router;
