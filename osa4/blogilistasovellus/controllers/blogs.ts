import express = require("express");
import blogModel = require("../models/blog");
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import User from "../models/user";
import { BlogNotFoundError } from "../utils/error";
import config = require("../utils/config");
require("express-async-errors");

const blogRouter = express.Router();

const getToken = (request: express.Request) => {
  const authorization = request.get("authorization");

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return null;
  }

  return authorization.replace("Bearer ", "");
};

blogRouter.get("/", async (request, response) => {
  const blogs = await blogModel
    .find({})
    .populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const decodedToken = jwt.verify(
    getToken(request),
    config.SECRET
  ) as JwtPayload;
  console.log(decodedToken);

  const id = decodedToken.id;

  if (!id) {
    throw new JsonWebTokenError("invalid token");
  }

  const user = await User.findById(id);

  const blog = new blogModel({
    ...body,
    likes: body.likes || 0,
    user: user._id,
  });
  const returnedBlog = await blog.save();

  user.blogs = user.blogs.concat(returnedBlog._id);
  await user.save();

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
