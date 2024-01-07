import express = require("express");
import blogModel = require("../models/blog");

const blogRouter = express.Router();

blogRouter.get("/", async (request, response) => {
  const blogs = await blogModel.find({});

  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new blogModel(request.body);
  const returnedBlog = await blog.save();

  response.status(201).json(returnedBlog);
});

export = blogRouter;
