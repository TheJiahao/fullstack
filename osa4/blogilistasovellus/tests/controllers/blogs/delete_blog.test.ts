import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../../app";
import Blog from "../../../models/blog";
import blogHelper from "../blog_helper";
import userHelper from "../user_helper";
import loginHelper from "../login_helper";
import User from "../../../models/user";

const api = supertest(app);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("deletion of blogs", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await userHelper.addInitialUsers(api);
    await Blog.deleteMany({});

    const { username } = userHelper.initialUsers[0];
    const userId = (await User.findOne({ username })).id;

    await Blog.insertMany(
      blogHelper.initialBlogs.map((blog) => {
        return { ...blog, user: userId };
      })
    );
  });

  test("succeeds when deleting existing blog with valid token", async () => {
    const token = await loginHelper.getToken(api, userHelper.initialUsers[0]);

    const blogToDelete = (await blogHelper.getAllBlogs())[0];
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogs = await blogHelper.getAllBlogs();

    expect(blogs).toHaveLength(blogHelper.initialBlogs.length - 1);
  });

  test("succeeds when deleting non-existent blog", async () => {
    const token = await loginHelper.getToken(api, userHelper.initialUsers[0]);
    const id = await blogHelper.getNonExistingBlogId();

    await api
      .delete(`/api/blogs/${id}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204);

    const blogs = await blogHelper.getAllBlogs();
    expect(blogs).toHaveLength(blogHelper.initialBlogs.length);
  });
});
