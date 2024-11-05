const express = require("express");
const articleRouter = require("./articles.js");
const router = express.Router();

router.use("/articles", articleRouter);

module.exports = router;
