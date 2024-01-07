import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import blog from "../models/blog";
import helper from "./test_helper";
import Blog from "../interfaces/blog";

const api = supertest(app);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("getting blogs", () => {
  beforeEach(async () => {
    await blog.deleteMany({});
    await blog.insertMany(helper.getInitialBlogs);
  });

  test("returns blogs as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns correct amount of blogs", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.getInitialBlogs.length);
  });
});

describe("addition of blogs", () => {
  beforeEach(async () => {
    await blog.deleteMany({});
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

    expect(response.body).toHaveLength(1);
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

  test("adding a blog without likes sets likes to 0", async () => {
    const newBlog = {
      title: "How to become a half-stack developer",
      author: "Quarter-stack Developer",
      url: "halfstackopen.com",
    };

    const response = await api.post("/api/blogs").send(newBlog);

    expect(response.body.likes).toBe(0);
  });

  test("adding a blog without title fails", async () => {
    const newBlog = {
      author: "Quarter-stack Developer",
      url: "halfstackopen.com",
      likes: 100,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(0);
  });

  test("adding a blog without url fails", async () => {
    const newBlog = {
      title: "How to become a half-stack developer",
      author: "Quarter-stack Developer",
      likes: 100,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(0);
  });
});

describe("deletion of blogs", () => {
  beforeEach(async () => {
    await blog.deleteMany({});
    await blog.insertMany(helper.getInitialBlogs);
  });

  test("succeeds when deleting existing blog", async () => {
    const blogToDelete = (await helper.getAllBlogs())[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogs = await helper.getAllBlogs();

    expect(blogs).toHaveLength(helper.getInitialBlogs.length - 1);
  });
});
