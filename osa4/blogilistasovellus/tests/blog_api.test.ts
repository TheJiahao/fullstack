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

  beforeEach(async () => {
    await blog.deleteMany({});
    await blog.insertMany(helper.initialBlogs);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
