const { database } = require("../libs/prisma.js");

const createArticle = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newArticle = await database.article.create({
      data: {
        title,
        content,
        likeCount: 0,
      },
    });

    console.log("Create Article:", newArticle);

    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ error: error.message });
  }
};

const getArticle = async (req, res) => {
  const { articleId } = req.params;

  try {
    const article = await database.article.findUnique({
      where: { id: articleId },
      include: { likes: true },
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    console.log("Get article:", article);

    res.status(200).json(article);
  } catch (error) {
    console.error("Error getting article:", error);
    res.status(500).json({ error: error.message });
  }
};

const getLikeCount = async (req, res) => {
  const { articleId } = req.params;

  try {
    const article = await database.article.findUnique({
      where: { id: articleId },
      select: { likeCount: true },
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    console.log("Get Like count:", article);

    res.json({ likeCount: article.likeCount });
  } catch (error) {
    console.error("Error getting liked article:", error);
    res.status(500).json({ error: error.message });
  }
};

const likeArticle = async (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.body;

  try {
    const existingLike = await database.like.findUnique({
      where: {
        articleId_userId: {
          articleId,
          userId,
        },
      },
    });

    if (existingLike) {
      return res
        .status(400)
        .json({ message: "User has already liked this article" });
    }

    await database.like.create({
      data: {
        articleId,
        userId,
      },
    });

    const likedArticle = await database.article.update({
      where: { id: articleId },
      data: { likeCount: { increment: 1 } },
    });

    console.log("Liked Article:", likedArticle);

    res.status(201).json({ message: "Article liked successfully" });
  } catch (error) {
    console.error("Error liking article:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createArticle, getArticle, getLikeCount, likeArticle };
