var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var follow = new Schema({
  fromFollowUserId : String,
  followingUserID: String,
  alreadyFav : Boolean,
  //ProjectPdfPath: String,
},{timestamps: true});

module.exports = mongoose.model('follow', follow);
