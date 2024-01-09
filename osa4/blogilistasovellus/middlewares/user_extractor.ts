import express = require("express");
import config = require("../utils/config");
import jwt, { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: object;
  }
}

const userExtractor: express.RequestHandler = (request, response, next) => {
  request.user = jwt.verify(request.token, config.SECRET) as JwtPayload;

  next();
};

export default userExtractor;
