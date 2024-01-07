import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import blog from "../models/blog";
import helper from "./test_helper";

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

  beforeEach(async () => {
    await blog.deleteMany({});
    await blog.insertMany(helper.initialBlogs);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
