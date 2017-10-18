var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var user = new Schema({
 username: {type: String, unique: true},
 password: String,
 emailAccount: {type: String, unique: true},
 contactName: String,
 Phone: Number,
 Country: String,
 Region: String,
 City: String,
 Suscription: String,
 provider : String,
 providerId: {type: String, unique: true},
}, {timestamps: true});

user.plugin(passportLocalMongoose);
module.exports = mongoose.model('user', user);
