var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var project = new Schema({
  ProjectOwner: String,
  ProjectName: String,
  ProjectDetails: String,
  ProjectFileNames: [],
  //ProjectPdfPath: String,
  ProjectLocation: String,
  ProjectAmount: Number,
}, {timestamps: true});

module.exports = mongoose.model('project', project);
