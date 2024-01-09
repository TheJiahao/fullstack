import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../../app";
import Blog from "../../../models/blog";
import helper from "../blog_helper";

const api = supertest(app);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("deletion of blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  test("succeeds when deleting existing blog", async () => {
    const blogToDelete = (await helper.getAllBlogs())[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogs = await helper.getAllBlogs();

    expect(blogs).toHaveLength(helper.initialBlogs.length - 1);
  });

  test("succeeds when deleting non-existent blog", async () => {
    const id = await helper.getNonExistingBlogId();

    await api.delete(`/api/blogs/${id}`).expect(204);

    const blogs = await helper.getAllBlogs();
    expect(blogs).toHaveLength(helper.initialBlogs.length);
  });
});
