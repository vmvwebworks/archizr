var fs = require('fs');
var filepath = "../public/userFiles/projectImage/";
var mongoose = require('mongoose');
var passport = require('passport');
var Project = require('../models/projects');
var File = require('../models/files');
var multer = require('multer');


module.exports = {

  plain : function(req, res){
    if(!req.user){
      res.redirect('/user/login');
    }
    File.find({FileOwner : req.user.id}, function(err, files){
      res.render('file/resume',{
        title: "Administrar imágenes y documentos",
        user: req.user,
        listFiles : files,
      });
    });

  },


  /**********/


  upload : function(req, res){
    if(!req.user){
      res.redirect('/user/login');
    }
    var files = req.files;
    var typeOfFile;
    var savingFile;
    for (file in files){
      console.log(files[file]);
      if(files[file].filename != null){
        typeOfFile = "image";
      }
      else{
        typeOfFile = "no file";
      };
      savingFile = new File({
        FileOwner : req.user.id,
        FileName : files[file].filename,
        FileType : typeOfFile,
      });
      console.log(savingFile);
      savingFile.save(function(err){
        if(err){
          console.log(err);
          res.render('project/create', {
            title: "La información no es válida, volver a introducir los datos",
          });
        }
      });
    }
    res.redirect('/file');
  },

    /**********/

  delete : function (req, res){
    if(!req.user){
      res.redirect('/user/login');
    }
    File.findById(req.params.id, function(err, file){
      if(err){
        console.log("error");
        console.log(err);
        res.redirect('/file');
      }
      if(!err){
        console.log(filepath+file.FileNames);
        fs.stat(filepath+file.FileNames, function(err, stat, next){
          if(err == null){
            fs.unlinkSync(filepath+file.FileNames);
          }
          else{
            next();
          }
        });


      }
      file.remove(function(err){
        if(err){
          console.log(err);
          res.redirect('/file');
        }
          res.redirect('/file');
      });
    });

  },
}
