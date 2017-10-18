var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var message = new Schema({
  MessageOwner: String,
  MessageDestination: String,
  MessageTitle: String,
  MessageContent: String,
  MessageSentDel: Boolean,
  MessageDestDel: Boolean,
  MessageRead: Boolean,
  //ProjectPdfPath: String,
}, {timestamps: true});

module.exports = mongoose.model('message', message);
