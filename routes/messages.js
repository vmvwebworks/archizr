//routes/messages.js
var express = require('express');
var controller = require('../controllers/messageController');
var passport = require('passport');
var router = express.Router();

router.get('/', controller.plain);
router.get('/new', controller.newMessage);
router.post('/new', controller.sendMessage);
router.post('/deleteSent/:id', controller.deleteSentMessage);
router.post('/deleteRec/:id', controller.deleteRecMessage);
router.get('/:id', controller.readMessage);

module.exports = router;
