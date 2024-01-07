import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import blog from "../models/blog";
import helper from "./test_helper";
import Blog from "../interfaces/blog";

const api = supertest(app);

describe("app", () => {
  test("returns blogs as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns correct amount of blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("returns blogs that has id as only identifier", async () => {
    const response = await api.get("/api/blogs");

    for (const blog of response.body) {
      expect(blog.id).toBeDefined();
      expect(blog._id).toBeUndefined();
    }
  });

  test("a valid blog can be added", async () => {
    const newBlog: Blog = {
      title: "How to become a half-stack developer",
      author: "Quarter-stack Developer",
      url: "halfstackopen.com",
      likes: 100,
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
  });

  test("a blog is added correctly", async () => {
    let response = await api.post("/api/blogs").send({
      title: "How to become a half-stack developer",
      author: "Quarter-stack Developer",
      url: "halfstackopen.com",
      likes: 100,
    });

    const newBlog = response.body;

    response = await api.get("/api/blogs");

    expect(response.body).toContainEqual(newBlog);
  });

  beforeEach(async () => {
    await blog.deleteMany({});
    await blog.insertMany(helper.initialBlogs);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
