var fs = require('fs');
var mongoose = require('mongoose');
var passport = require('passport');
var Project = require('../models/projects');
var File = require('../models/files');
var multer = require('multer');


module.exports = {

    plain : function (req, res) {
      //Datos cocinados con la respuesta...
      if(!req.user){
        res.redirect('/user/login');
      }
      Project.find({ ProjectOwner : req.user.id}, function(err, projects){
        console.log("***content from Project***")
        console.log(projects)
        res.render('project/resume', {
          // resume page view parameters
          title : "proyectos",
          user : req.user,
          projects : projects,
        });
      });
    },

    /**********/

    projectShow : function (req, res){
      Project.findById(req.params.id, function(err, project){
        if(!req.user){
          res.render('project/project',{
            title : project.ProjectName,
            project: project,
          });
        }
        res.render('project/project',{
          title : project.ProjectName,
          project: project,
          user : req.user,
        });
      });
    },

    /**********/

    create : function (req, res) {
      //Datos cocinados con la respuesta...
      if(!req.user){
        res.redirect('/user/login');
      }
      res.render('project/create', {
        // resume page view parameters
        title : "Crear proyecto",
        user : req.user,
        projectName: "Nombre del proyecto",
        image: "Subir imágen",
        plane: "Subir plano en formato PDF",
        details: "Detalles, información sobre el proyecto.",
        ammount: "¿Cual es el coste de esto?",
        location: "Localización",

      });
    },

    /**********/

    saveProject : function (req, res){
      var typeOfFile;
      var files = req.files;
      for (file in files){
        console.log(files[file]);
        if(files[file].filename != null){
          typeOfFile = "image";
        }
        else{
          typeOfFile = "no file";
        };
        var savingFile = new File({
          FileOwner : req.user.id,
          FileName : files[file].filename,
          FileType : typeOfFile,
        });
        savingFile.save(function(err){
          if(err){
            console.log(err);
            res.render('project/create', {
              title: "La información no es válida, volver a introducir los datos",
            });
          }
        });
      }
      var listFiles = [];
      for (file in files){
        listFiles.push(files[file].filename);
      }
      console.log(listFiles);
      var savingProject = new Project({
        ProjectOwner : req.user.id,
        ProjectName : req.body.projectName,
        ProjectDetails : req.body.details,
        ProjectFileNames : listFiles,
        //ProjectPdfPath : .plane,
        ProjectAmount : req.body.ammount,
        ProjectLocation : req.body.localize,
      });
      savingProject.save(function(err){
        if(err){
          console.log(err);
          res.render('project/create', {
            title: "La información no es válida, volver a introducir los datos",
          });
        }
        if(!err){res.send('ok');}
      });
    },

    /**********/

    editProject : function ( req, res, file){
      if(!req.user){
        res.redirect('/user/login');
      }
      Project.findById(req.params.id, function(err, projects){
        res.render('project/edit', {
          title: "editar proyecto",
          project : projects,
          user : req.user,
        });
        console.log(projects);
      });
    },

    saveEditProject : function (req, res, file){
      //console.log(req.body.projectName);
      Project.findById(req.params.id, function(err, project){
        console.log('err'+ err);
        console.log('project'+ project);
        console.log(req.body);
        console.log('body projectname: ' + req.body.projectName);
        if(!project){
          res.redirect('/project');
        }
        if(req.body.projectName != ""){
            project.ProjectName = req.body.projectName;
        }
        if(req.body.details != ""){
          project.ProjectDetails = req.body.details;
        }
        if(req.body.ammount != null){
          project.ProjectAmount = req.body.ammount;
        }
        if(req.body.localize != ""){
          project.ProjectAmount = req.body.localize;
        }
        if(req.body.image != ""){
          project.ProjectFileNames = req.file.filename;
        }
        project.save(function(err){
            if (err) {
            console.log(err);
            }
            res.redirect('/project');
        });

      });
    },

    /**********/

    deleteProject : function (req, res){
      if(!req.user){
      res.redirect('/');
      }
      Project.findById(req.params.id, function(err, project){
        project.remove(function(){
            res.redirect('/project');
        });
      });

    },

  }
