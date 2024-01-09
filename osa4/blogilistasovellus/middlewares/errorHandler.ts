import { ErrorRequestHandler } from "express";
import logger from "../utils/logger";

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  logger.error(error);

  switch (error.name) {
    case "ValidationError":
    case "InvalidPasswordError":
      response.status(400).send({ error: error.message }).end();
      break;
    case "BlogNotFoundError":
      response.status(404).send({ error: error.message }).end();
      break;
    case "InvalidCredentialsError":
      response.status(401).send({ error: error.message }).end();
      break;
    default:
      response.status(500).send({ error: error.message }).end();
  }

  next(error);
};

export default errorHandler;
