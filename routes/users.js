var express = require('express');
var controller = require('../controllers/userController');
var passport = require('passport');
var router = express.Router();
var apiKeys = require('../apiKeys');


/* GET users listing. */
router.get('/', controller.plain);
router.get('/register', controller.newUser);
router.post('/register', controller.register);
router.get('/login', controller.login);
router.post('/login', controller.authenticated);
//router.get('/edit', controller.editUser);
//router.post('/edit', controller.editUserSave);
router.get('/logout', controller.logout);
//router.post('/login', passport.authenticate('local', { successRedirect: '/',failureRedirect: '/user/login', title : 'Usuario no válido, vuelve a introducir los datos.' }), controller.authenticated);
router.get('/edit/:id', controller.editUser);

/*
***** Social Logins *****
*/
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect : '/',
  failureRedirect : '/'
}));
router.get('/:username', controller.userShow);
module.exports = router;
