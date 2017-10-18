var mongoose = require('mongoose');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var Account = require('../models/accounts');
var Project = require('../models/projects');
var Message = require('../models/messages');
var Follow = require('../models/follows');
var apiKeys = require('../apiKeys');

module.exports = {
  facebook : function(access_token, refresh_token, profile, done){
    console.log("*************");
    console.log("entra en fbAuth");
    console.log("*************");
    Account.findOne({'providerId' : profile.id}, function(err, user){
      if(err)
        return done(err);

      if(user)
        return done(null, user);

      else
        var newUser = new Account({
          emailAccount : profile.emails[0].value,
          provider : profile.provider,
          providerId : profile.id,
          username : profile.name.givenName,
        });
        newUser.save();

    });
  },
}
