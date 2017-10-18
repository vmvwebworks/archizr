var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var file = new Schema({
  FileOwner: String,
  FileName: String,
  FileType: String,
}, {timestamps: true});

module.exports = mongoose.model('file', file);
