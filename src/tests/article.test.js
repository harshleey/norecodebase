const request = require("supertest");
const app = require("../server.js");
const { database } = require("../libs/prisma.js");
jest.setTimeout(20000);
let server;
describe("Article like Feature Tests", () => {
  let articleId;
  let article;

  beforeAll(async () => {
    server = app.listen(9900, () => console.log("Server running on port 9900"));
  });

  afterAll(async () => {
    await database.like.deleteMany({});
    await database.article.deleteMany({});
    await database.$disconnect();
    server.close();
  });

  test("POST /api/articles - should create a new article", async () => {
    const res = await request(app).post("/api/articles").send({
      title: "Sample Article",
      content: "This is a sample article content.",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.title).toBe("Sample Article");
    articleId = res.body.id;
  });

  test("GET /api/articles/:articleId - should get an article by ID", async () => {
    if (!articleId) throw new Error("Article ID not set from previous test");
    const res = await request(app).get(`/api/articles/${articleId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
    expect(res.body.id).toBe(articleId);
    expect(res.body).toHaveProperty("title", "Sample Article");
  });

  test("POST /api/articles/:articleId/like - should like an article", async () => {
    if (!articleId) throw new Error("Article ID not set from previous test");
    const res = await request(app)
      .post(`/api/articles/${articleId}/like`)
      .send({ userId: "user123" });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Article liked successfully");
  });

  test("GET /api/articles/:articleId/likes - should get the like count", async () => {
    if (!articleId) throw new Error("Article ID not set from previous test");
    const res = await request(app).get(`/api/articles/${articleId}/likes`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("likeCount");
  });

  test("POST /api/articles/:articleId/like - should prevent duplicate likes", async () => {
    const res = await request(app)
      .post(`/api/articles/${articleId}/like`)
      .send({ userId: "user123" });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("User has already liked this article");
  });
});
