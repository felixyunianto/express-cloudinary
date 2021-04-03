const mainRouter = require('express').Router();

const uploadRouter = require('./upload');

mainRouter.use('/upload', uploadRouter);

module.exports = mainRouter;