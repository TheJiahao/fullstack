import { ErrorRequestHandler } from "express";
import logger from "../utils/logger";

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
  logger.error(error);

  const statusCodes = new Map([
    ["ValidationError", 400],
    ["InvalidPasswordError", 400],
    ["BlogNotFoundError", 404],
    ["InvalidCredentialsError", 401],
    ["JsonWebTokenError", 401],
  ]);

  response
    .status(statusCodes.get(error.name) || 500)
    .send({ error: error.message })
    .end();

  next(error);
};

export default errorHandler;
