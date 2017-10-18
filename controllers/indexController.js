var Account = require('../models/accounts');
var Fav = require('../models/favs');
var Project = require('../models/projects');
var Message = require('../models/messages');
var mongoose = require('mongoose');

module.exports = {
    plain : function (req, res) {
      Project.find(function(err, projects){
        Account.find(function(err, userOwner){
          if(req.user)
            Fav.find({'favUserId': req.user.id},function(err, favs){
              res.render('index',{
                title: "Archizr",
                user: req.user,
                listProjects : projects,
                listUsers : userOwner,
                listFavs : favs
              });
            });
          else
            res.render('index',{
              title: "Archizr",
              listProjects : projects,
              listUsers : userOwner,
            });
        });
      });

    },
};
