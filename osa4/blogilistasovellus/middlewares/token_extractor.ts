import express = require("express");

declare module "express-serve-static-core" {
  interface Request {
    token?: string;
  }
}

const tokenExtractor: express.RequestHandler = (request, response, next) => {
  const authorization = request.get("authorization");

  request.token =
    authorization && authorization.startsWith("Bearer ")
      ? authorization.replace("Bearer ", "")
      : null;

  next();
};

export default tokenExtractor;
