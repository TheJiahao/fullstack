import { ErrorRequestHandler } from "express";
import logger from "../utils/logger";

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  logger.error(error);

  if (error.name === "ValidationError") {
    response.status(400).send({ error: error.message }).end();
  } else if (error.name === "BlogNotFoundError") {
    response.status(404).send({ error: error.message }).end();
  } else {
    response.status(500).send({ error: error.message }).end();
  }

  next(error);
};

export default errorHandler;
