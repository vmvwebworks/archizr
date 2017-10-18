var Account = require('../models/accounts');
var mongoose = require('mongoose');
var passport = require('passport');
var fav = require('../models/favs');
var Project = require('../models/projects');
module.exports = {

    plain : function (req, res) {
      if(!req.user){
        res.redirect('/');
      }
      else{
        fav.find(function(err, favs){
          Project.find(function(err, projects){
            Account.find(function(err, users){
              Project.find({'ProjectOwner' : req.user.id }, function(err, ownProjects){
                res.render('fav/resume', {
                  title : "favoritos",
                  user : req.user,
                  listFavs : favs,
                  listProjects: projects,
                  listOwnProjects : ownProjects,
                  listUsers : users,
                  });
                });
              });
            });
          });
      }
    },
    newFav : function (req, res){
      if(!req.user){
        res.redirect('/user/login');
      }
      var user = req.user;
      Project.findById(req.params.id, function(err, project){
        console.log(project);
        var saveFav = new fav({
          favUserId : req.user.id,
          favProjectId : project.id,
          alreadyFav : true,
        });
        fav.findOne({favUserId : req.user.id, favProjectId : project.id }, function(err, already){
          console.log(already);
          if(already == null){
            saveFav.save();
          }
        });
        res.redirect('/project/'+project.id);
      });
    },
    removeFav : function (req, res){
      if(!req.user){
        res.redirect('/user/login');
      }
      fav.findOne({'favProjectId' : req.params.id, 'favUserId' : req.user.id}, function(err, fav){
        fav.remove();
        res.redirect('/');
      });
    },

}
