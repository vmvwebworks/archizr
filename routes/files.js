var express = require('express');
var controller = require('../controllers/fileController');
var passport = require('passport');
var multer = require('multer');
var router = express.Router();

  // For Project Images destination
var ImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/userFiles/projectImage')
  },
  filename: function (req, file, cb) {
    cb(null, "UploadedOn" + Date.now() + "fileOrigName" + file.originalname)
  }
});

  // For Project Images destination
var PlaneStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../public/userFiles/plane')
  },
  filename: function (req, file, cb) {
    cb(null, "UploadedOn" + Date.now() + "fileOrigName" + file.originalname)
  }
});

var uploadImage = multer({ storage: ImageStorage});

router.get('/', controller.plain);
router.post('/', uploadImage.array('image'), controller.upload);
router.post('/delete/:id', controller.delete);
//router.post('/edit/:id', uploadProjectImage.single('image'), controller.saveEditProject);
//router.get('/delete/:id', controller.deleteProject);
module.exports = router;
