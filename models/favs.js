var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var fav = new Schema({
  favUserId : String,
  favProjectId : String,
  alreadyFav : Boolean,
  //ProjectPdfPath: String,
}, {timestamps: true});

module.exports = mongoose.model('fav', fav);
