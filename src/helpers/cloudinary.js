const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadCloudinary = (req, res) => {
  const pathFile = req.file.path;
  console.log("Path File ",pathFile);
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
};

module.exports = uploadCloudinary;
