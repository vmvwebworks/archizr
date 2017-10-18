var mongoose = require('mongoose');
var passport = require('passport');
var Account = require('../models/accounts');
var Follow = require('../models/follows');
module.exports = {

    plain : function (req, res) {
      if(!req.user){
        res.redirect('/');
      }
      else{
        Account.find(function(err, users){
          Follow.find(function(err, follow){
            res.render('follow/resume', {
              title : "seguimiento",
              user : req.user,
              listUsers : users,
              listFollowUsers : follow,
            });
          });
        });
      }
    },

    newFollow : function(req, res){
      if(!req.user){
        res.redirect('/user/login');
      }
      Account.findById(req.params.id, function(err, forFollowUser){
        console.log("forFollowUser: "+forFollowUser)
        var saveFollow = new Follow({
          fromFollowUserId : req.user.id,
          followingUserID : forFollowUser.id,
          alreadyFav : true,
        });
        Follow.findOne({fromFollowUserId : req.user.id, followingUserID : forFollowUser.id }, function(err, already){
          console.log("req.user.id: "+req.user.id);
          console.log("req.params.id:"+ forFollowUser.id);
          console.log("already: "+already);
          if(already == null){
            saveFollow.save();
          }
        });
        res.redirect('/user/'+forFollowUser.username);
      });
    },
    unFollow : function(req, res){
      if(!req.user){
        res.redirect('/user/login');
      }
      Follow.findOne({fromFollowUserId : req.user.id, followingUserID : req.params.id }, function( err, Unfollow){
        Unfollow.remove();
        res.redirect('/');
      });
    },
}
