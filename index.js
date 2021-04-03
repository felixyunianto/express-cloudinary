require('dotenv').config({});
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mainRouter = require("./src/routes");

app.use(express.static("/public"));

app.use("/", mainRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
