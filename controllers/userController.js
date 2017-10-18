var email = require('emailjs');
var mongoose = require('mongoose');
var passport = require('passport');
var Account = require('../models/accounts');
var Project = require('../models/projects');
var Message = require('../models/messages');
var Follow = require('../models/follows');



module.exports = {

    plain : function (req, res) {
      //Datos cocinados con la respuesta...
      if(!req.user){
        res.redirect('/user/login');
        }
      Project.find({ ProjectOwner : req.user.id}, function(err, projects){
        Message.find({ MessageDestination : req.user.id}, function(err, messages){
          console.log(messages);
          res.render('account/mainMenu',{
            user : req.user,
            title: "Archizr - página de usuario",
            username: req.user.username,
            contactName: "barragonio celonio",
            emailAccount: req.user.emailAccount,
            phone: "633412312",
            country: "Spain",
            region: "Madrid",
            city: "Barcelona",
            suscription: "no",
            contacts: "",
            favourites: "",
            listProjects : projects,
            listMessages : messages,
          });
        });

      });

    },
    userShow : function(req, res){
      Account.findOne({ username: req.params.username }, function(err, userWatch){
        Follow.find({followingUserID : userWatch.id}, function(err, follows){
          Project.find({ProjectOwner : userWatch.id}, function(err, projects){
            res.render('account/profile',{
              title : userWatch.username,
              user : req.user,
              watchUser : userWatch,
              listProjects : projects,
              listFollows : follows
            });
          });
        });
      });

    },
    newUser : function(req, res){
      if(req.user){
        res.redirect('/');
      }
      if(!req.user){
        res.render('account/newUser',{
          user : req.user,
          title: "Nuevo Usuario",
          username: "Usuario",
          password: "contraseña",
          emailAccount: "Cuenta de email",
        });
      }
    },
    register : function (req, res){
      Account.register(new Account({
        username : req.body.username,
        emailAccount : req.body.emailAccount
       }),
       req.body.password,
       function(err, account) {

          passport.authenticate('local')(req, res,  function () {
            if (err) {
              return res.render("account/newUser", {title: "Sorry. That username already exists. Try again."});
            }
            var server = email.server.connect({
                user: process.env.SMTPUSER,
                password: process.env.SMTPPASSWORD,
                host: process.env.SMTPSERVER
            });
            var message = {
              text : "texto de prueba",
              from : process.env.POSTMASTER,
              to : req.body.emailAccount,
              subject: "Activar cuenta en Archizr"
            };
            server.send(message, function(err, message){
              if(err){
                console.log("error enviando mensaje de registro:");
                console.log(err);
              }
              else{
                console.log("se ha enviado un mensaje de registro con el siguiente mensaje:");
                console.log(message);
              }

            });
            res.redirect('/');
          });
      });
    },
    login : function(req, res){
      res.render('account/login',{
        user : req.user,
        title: "Iniciar sesión",
        username: req.user,
        password: req.password,
      });
    },

    authenticated : function(req, res, next){
      passport.authenticate('local', function(err, user, info){
        if (err){return next(err);}
        if (!user){return res.render('account/login',{title : "acceso incorrecto, vuelve a introducir los datos", user : req.user});}
        req.logIn(user, function(err){
          if(err){return next(err);}
          return res.redirect('/user');
        });
      })(req, res, next);
    },
    logout : function(req, res){
      req.logout();
      res.redirect('/')
    },

    editUser : function(req, res){
      if(!req.user){
        res.redirect('/user/login')
      }
      res.render('account/editUser',{
        title : "Editar información de usuario",
        user : req.user,
        userID : req.user.id,
        username : req.user.username,
        emailAccount : req.user.emailAccount
      });

    },

    manageMats : function(req, res){
      if(!req.user){
        res.redirect('/user/login')
      }
      res.render('manage/resume',{
        title: "Administrar imágenes y documentos",
        user: req.user,
      });

    },
  }
