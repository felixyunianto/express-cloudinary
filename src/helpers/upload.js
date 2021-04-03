const multer = require("multer");
const path = require("path");
const formResponse = require('./form');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const destinationFile = "public/uploads";
    callback(null, destinationFile);
  },

  filename: (req, file, callback) => {
    const uploadName = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`;

    callback(null, uploadName);
  },
});

const upload = multer({
    storage,
    limits: 5 * 1000 * 1000
});

const singleUpload = (req, res, next) => {
    const uploadSinggle = upload.single('upload');
    uploadSinggle(req, res, (err) => {
        if(err) {
            return formResponse.error(res, "Multer Error", 500, err)
        }else{
            next();
        }
    })
}

module.exports = singleUpload