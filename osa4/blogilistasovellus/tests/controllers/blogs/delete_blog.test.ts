import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../../app";
import Blog from "../../../models/blog";
import blogHelper from "../blog_helper";

const api = supertest(app);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("deletion of blogs", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(blogHelper.initialBlogs);
  });

  test("succeeds when deleting existing blog", async () => {
    const blogToDelete = (await blogHelper.getAllBlogs())[0];
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogs = await blogHelper.getAllBlogs();

    expect(blogs).toHaveLength(blogHelper.initialBlogs.length - 1);
  });

  test("succeeds when deleting non-existent blog", async () => {
    const id = await blogHelper.getNonExistingBlogId();

    await api.delete(`/api/blogs/${id}`).expect(204);

    const blogs = await blogHelper.getAllBlogs();
    expect(blogs).toHaveLength(blogHelper.initialBlogs.length);
  });
});
