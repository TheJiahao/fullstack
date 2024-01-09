import express = require("express");
import blogModel = require("../models/blog");
import { JsonWebTokenError } from "jsonwebtoken";
import tokenExtractor from "../middlewares/token_extractor";
import userExtractor from "../middlewares/user_extractor";
import User from "../models/user";
import { BlogNotFoundError, InvalidCredentialsError } from "../utils/error";

require("express-async-errors");

const blogRouter = express.Router();

blogRouter.get("/", async (request, response) => {
  const blogs = await blogModel
    .find({})
    .populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogRouter.post(
  "/",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    if (!request.user.id) {
      throw new JsonWebTokenError("invalid token");
    }

    const user = await User.findById(request.user.id);

    const body = request.body;
    const blog = new blogModel({
      ...body,
      likes: body.likes || 0,
      user: user._id,
    });
    const returnedBlog = await blog.save();

    user.blogs = user.blogs.concat(returnedBlog._id);
    await user.save();

    response.status(201).json(returnedBlog);
  }
);

blogRouter.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  async (request, response) => {
    const blog = await blogModel.findById(request.params.id);

    if (blog) {
      if (request.user.id !== blog.user.toString()) {
        throw new InvalidCredentialsError("deletion not permitted");
      }

      await blogModel.findByIdAndDelete(request.params.id);
    }

    response.status(204).end();
  }
);

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
