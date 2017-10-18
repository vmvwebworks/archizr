var mongoose = require('mongoose');
var passport = require('passport');
var messages = require('../models/messages');
var users = require('../models/accounts');
module.exports = {

    plain : function(req, res) {
      if(!req.user){
        res.redirect('/');
      }
      messages.find({ MessageDestination : req.user.id, MessageDestDel: false}, function(err, recMessages){
        messages.find({ MessageOwner : req.user.id, MessageSentDel : false }, function(err, sentMessages){
          res.render('message/resume', {
            title : "mensajes",
            user : req.user,
            listRecMessages : recMessages,
            listSentMessages : sentMessages
          });
        });
      });
    },
    readMessage : function(req, res){
      if(!req.user){
        res.redirect('/user/login');
      }
      messages.findById(req.params.id, function(err, message){
        message.MessageRead = true;
        message.save();
        res.render('message/read',{
          title : message.MessageTitle,
          user: req.user,
          message : message,

        });
      });

    },
    deleteRecMessage : function(req, res){
      if(!req.user){
        res.redirect('/');
      }
      messages.findById(req.params.id, function(err, message){
        console.log(message);
        console.log(req.user);
        if(message.MessageDestination != req.user.id){
          res.redirect('/message');
        }
        else{
          message.MessageDestDel = true;
          message.save();
          if((message.MessageSentDel == true) && (message.MessageDestDel == true)){
            message.remove();
          }
          res.redirect('/message');
        }

      });

    },
    deleteSentMessage : function(req, res){
      if(!req.user){
        res.redirect('/');
      }
      messages.findById(req.params.id, function(err, message){
        console.log(message);
        console.log(req.user);
        if(message.MessageOwner != req.user.id){
          res.redirect('/message');
        }
        else{
          message.MessageSentDel = true;
          message.save();
          if((message.MessageSentDel == true) && (message.MessageDestDel == true)){
            message.remove();
          }
          res.redirect('/message');
        }

      });

    },

    newMessage : function(req, res){
      if(!req.user){
        res.redirect('/')
      }
      res.render('message/newMessage', {
        title : "Mensaje Nuevo",
        user : req.user,
      });


    },
    sendMessage : function(req, res){
      if(!req.user){
        res.redirect('/')
      }
        var sentMessage = new messages({
          MessageOwner : req.user.username,
          MessageDestination : req.body.messageDestination,
          MessageTitle : req.body.messageTitle,
          MessageContent : req.body.messageContent,
          MessageRead : false,
          MessageDestDel : false,
          MessageSentDel : false,
        });
        users.findOne({ 'username' : req.body.messageDestination }, function(err, destination){
          if(!destination){
            res.render("/message/new",{
              title: "has fallao mono, ese usuario no existe",
            });
          }
          else{
            sentMessage.MessageOwner = req.user.id;
            sentMessage.MessageDestination = destination.id;
            sentMessage.save(function(err){
              if(err){
                console.log(err);
              }
              res.redirect('/message');
            });
          }
        });
    },


}
