const express = require("express");
const {
  createArticle,
  getArticle,
  getLikeCount,
  likeArticle,
} = require("../controllers/articles.js");

const articleRouter = express.Router();

articleRouter.post("/", createArticle);
articleRouter.get("/:articleId", getArticle);
articleRouter.get("/:articleId/likes", getLikeCount);
articleRouter.post("/:articleId/like", likeArticle);

module.exports = articleRouter;
