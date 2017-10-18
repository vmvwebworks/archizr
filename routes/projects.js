var express = require('express');
var controller = require('../controllers/projectController');
var passport = require('passport');
var multer = require('multer');
var router = express.Router();

  // For Project Images destination
var ProjectImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/userFiles/projectImage')
  },
  filename: function (req, file, cb) {
    cb(null, "UploadedOn" + Date.now() + "fileOrigName" + file.originalname)
  }
});

  // For Project Images destination
var ProjectPlaneStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/userFiles/plane')
  },
  filename: function (req, file, cb) {
    cb(null, "UploadedOn" + Date.now() + "fileOrigName" + file.originalname)
  }
});

var uploadProjectImage = multer({ storage: ProjectImageStorage});


router.get('/', controller.plain);
router.get('/create', controller.create);
router.post('/create', uploadProjectImage.array('image'), controller.saveProject);
router.get('/edit/:id', controller.editProject);
router.post('/edit/:id', uploadProjectImage.single('image'), controller.saveEditProject);
router.get('/delete/:id', controller.deleteProject);
router.get('/:id', controller.projectShow);
//router.post('/create', controller.save);
//router.get('/delete', controller.delete);
module.exports = router;
