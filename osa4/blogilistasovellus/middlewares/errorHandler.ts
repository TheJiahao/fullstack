import { ErrorRequestHandler } from "express";
import logger from "../utils/logger";

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  logger.error(error);

  if (error.name == "ValidationError") {
    response.status(400).send(error.message).end();
  }

  next(error);
};

export default errorHandler;
