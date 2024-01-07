import express = require("express");
import blogModel = require("../models/blog");
require("express-async-errors");

const blogRouter = express.Router();

class BlogNotFoundError extends Error {
  name: string = "BlogNotFoundError";
}

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

blogRouter.delete("/:id", async (request, response) => {
  await blogModel.findByIdAndDelete(request.params.id);

  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const blog = request.body;
  delete blog.id;

  const updatedBlog = await blogModel.findByIdAndUpdate(
    request.params.id,
    blog,
    {
      new: true,
    }
  );

  if (!updatedBlog) {
    throw new BlogNotFoundError("Blog not found");
  }

  response.json(updatedBlog);
});

export = blogRouter;
