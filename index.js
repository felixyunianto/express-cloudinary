const express = require("express");
const app = express();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

app.use(express.static("/public"));

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/uploads/");
  },
  filename: (req, file, callback) => {
    const uploadName = `${Date.now()}-${file.fieldname}${path.extname(
      file.originalname
    )}`;

    callback(null, uploadName);
  },
});

app.post("/upload", (req, res, next) => {
  const upload = multer({ storage }).single("upload");
  upload(req, res, (err) => {
    if (err) {
      return res.send(err);
    }

    cloudinary.config({
      cloud_name: "plugin007",
      api_key: "174374485672511",
      api_secret: "mCto9gHpsXaU6e5cgkFXsxcViic",
    });

    const pathFile = req.file.path;
    const uniqueFileName = new Date().toISOString();

    cloudinary.uploader.upload(
      pathFile,
      {
        resource_type: "raw",
        public_id: `express-cloudinary/${uniqueFileName}`,
        tags: `express-cloudinary`,
      },
      (err, image) => {
        if (err) return res.send(err);
        console.log("File uploaded to Cloudinary");

        fs.unlinkSync(pathFile);
        res.json(image);
      }
    );
  });
});

app.listen(3000);
