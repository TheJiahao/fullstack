import express = require("express");
import blogModel = require("../models/blog");

const blogRouter = express.Router();

blogRouter.get("/", async (request, response) => {
  const blogs = await blogModel.find({});

  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;

  if (!body.title || !body.url) {
    throw new TypeError("title or url missing");
  }

  const blog = new blogModel({ ...body, likes: body.likes || 0 });
  const returnedBlog = await blog.save();

  response.status(201).json(returnedBlog);
});

export = blogRouter;
