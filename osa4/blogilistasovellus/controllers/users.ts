import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user";

const userRouter = express.Router();

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({ username, name, passwordHash });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

userRouter.get("/", async (request, response) => {
  const users = await User.find({});

  response.status(200).json(users);
});

export default userRouter;
