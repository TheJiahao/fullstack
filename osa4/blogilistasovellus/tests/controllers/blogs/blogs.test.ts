import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../../app";
import blog from "../../../models/blog";
import helper from "./helper";

const api = supertest(app);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("deletion of blogs", () => {
  beforeEach(async () => {
    await blog.deleteMany({});
    await blog.insertMany(helper.initialBlogs);
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

describe("updating blogs", () => {
  beforeEach(async () => {
    await blog.deleteMany({});
    await blog.insertMany(helper.initialBlogs);
  });

  test("succeeds when updating existing blog", async () => {
    const id = (await helper.getAllBlogs())[0].id;

    const updatedBlog = {
      title: "Updated blog",
      author: "New author",
      url: "url",
      likes: 1000,
    };

    await api.put(`/api/blogs/${id}`).send(updatedBlog).expect(200);
  });

  test("updates blog when updating existing blog", async () => {
    const id = (await helper.getAllBlogs())[0].id;

    const updatedBlog = {
      title: "Updated blog",
      author: "New author",
      url: "url",
      likes: 1000,
    };

    const response = await api.put(`/api/blogs/${id}`).send(updatedBlog);
    const returnedBlog = response.body;
    delete returnedBlog.id;

    expect(returnedBlog).toEqual(updatedBlog);
  });

  test("fails when blog does not exist", async () => {
    const id = await helper.getNonExistingBlogId();

    const updatedBlog = {
      title: "Updated blog",
      author: "New author",
      url: "url",
      likes: 1000,
    };

    await api.put(`/api/blogs/${id}`).send(updatedBlog).expect(404);
  });
});
