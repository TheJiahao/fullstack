import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user";
import { InvalidPasswordError } from "../utils/error";
require("express-async-errors");

const userRouter = express.Router();

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!(password && password.length >= 3)) {
    throw new InvalidPasswordError("minimum length of password is 3");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });

  response.status(200).json(users);
});

export default userRouter;
