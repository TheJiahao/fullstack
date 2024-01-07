import express = require("express");
import blogModel = require("../models/blog");

const blogRouter = express.Router();

blogRouter.get("/", async (request, response) => {
  const blogs = await blogModel.find({});

  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;

  const blog = new blogModel({ ...body, likes: body.likes || 0 });
  const returnedBlog = await blog.save();

  response.status(201).json(returnedBlog);
});

export = blogRouter;
