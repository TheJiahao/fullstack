import express = require("express");
import blogModel = require("../models/blog");

const blogRouter = express.Router();

blogRouter.get("/", async (request, response) => {
  const blogs = await blogModel.find({});

  response.json(blogs);
});

blogRouter.post("/", (request, response) => {
  const blog = new blogModel(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

export = blogRouter;
