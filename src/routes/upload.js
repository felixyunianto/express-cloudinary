const uploadRouter = require('express').Router();
const singleUpload = require('../helpers/upload');
const uploadClodinary = require('../helpers/cloudinary');

uploadRouter.post('/', singleUpload, uploadClodinary);

module.exports = uploadRouter;