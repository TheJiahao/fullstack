import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express from "express";
import User from "../models/user";
import config from "../utils/config";
require("express-async-errors");

class InvalidCredentialsError extends Error {
  name: string = "InvalidCredentialsError";
}

const loginRouter = express.Router();

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });

  if (
    !(
      user &&
      user.passwordHash &&
      (await bcrypt.compare(password, user.passwordHash))
    )
  ) {
    throw new InvalidCredentialsError("invalid username or password");
  }

  const token = jwt.sign(
    { username: user.username, id: user.id },
    config.SECRET
  );

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

export default loginRouter;
