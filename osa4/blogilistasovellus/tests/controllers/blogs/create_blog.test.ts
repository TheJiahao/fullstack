import mongoose from "mongoose";
import supertest from "supertest";
import app from "../../../app";
import Blog from "../../../models/blog";
import blogHelper from "../blog_helper";
import User from "../../../models/user";
import userHelper from "../user_helper";
import loginHelper from "../login_helper";

const api = supertest(app);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("addition of blogs", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await Blog.deleteMany({});

    await userHelper.addInitialUsers(api);

    const { username } = userHelper.initialUsers[0];
    const userId = (await User.findOne({ username })).id;

    await Blog.insertMany(
      blogHelper.initialBlogs.map((blog) => {
        return { ...blog, user: userId };
      })
    );
  });

  test("returns blogs that has id as only identifier", async () => {
    const response = await api.get(blogHelper.baseRoute);

    for (const blog of response.body) {
      expect(blog.id).toBeDefined();
      expect(blog._id).toBeUndefined();
    }
  });

  test("a valid blog with token can be added", async () => {
    const token = await loginHelper.getToken(api, userHelper.initialUsers[0]);

    const newBlog = {
      title: "How to become a half-stack developer",
      author: "Quarter-stack Developer",
      url: "halfstackopen.com",
      likes: 100,
    };

    await api
      .post(blogHelper.baseRoute)
      .send(newBlog)
      .set("Authorization", `Bearer ${token}`)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get(blogHelper.baseRoute);

    expect(response.body).toHaveLength(blogHelper.initialBlogs.length + 1);
  });

  test("a blog is added correctly", async () => {
    const token = await loginHelper.getToken(api, userHelper.initialUsers[0]);

    let response = await api
      .post(blogHelper.baseRoute)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "How to become a half-stack developer",
        author: "Quarter-stack Developer",
        url: "halfstackopen.com",
        likes: 100,
      });

    const newBlog = response.body;

    response = await api.get(blogHelper.baseRoute);

    expect(response.body).toContainEqual(newBlog);
  });

  test("adding a blog without likes sets likes to 0", async () => {
    const token = await loginHelper.getToken(api, userHelper.initialUsers[0]);

    const newBlog = {
      title: "How to become a half-stack developer",
      author: "Quarter-stack Developer",
      url: "halfstackopen.com",
    };

    const response = await api
      .post(blogHelper.baseRoute)
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog);

    expect(response.body.likes).toBe(0);
  });

  test("adding a blog without title fails", async () => {
    const token = await loginHelper.getToken(api, userHelper.initialUsers[0]);

    const newBlog = {
      author: "Quarter-stack Developer",
      url: "halfstackopen.com",
      likes: 100,
    };

    await api
      .post(blogHelper.baseRoute)
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const response = await api.get(blogHelper.baseRoute);
    expect(response.body).toHaveLength(blogHelper.initialBlogs.length);
  });

  test("adding a blog without url fails", async () => {
    const token = await loginHelper.getToken(api, userHelper.initialUsers[0]);

    const newBlog = {
      title: "How to become a half-stack developer",
      author: "Quarter-stack Developer",
      likes: 100,
    };

    await api
      .post(blogHelper.baseRoute)
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);

    const response = await api.get(blogHelper.baseRoute);
    expect(response.body).toHaveLength(blogHelper.initialBlogs.length);
  });

  test("adding a blog without token fails", async () => {
    const newBlog = {
      title: "How to become a half-stack developer",
      author: "Quarter-stack Developer",
      url: "halfstackopen.com",
      likes: 100,
    };

    await api.post(blogHelper.baseRoute).send(newBlog).expect(401);

    const response = await api.get(blogHelper.baseRoute);
    expect(response.body).toHaveLength(blogHelper.initialBlogs.length);
  });
});
