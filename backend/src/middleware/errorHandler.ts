import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/http";
import { z } from "zod";
import {
  handleAppError,
  handleZodError,
} from "../validation-schemas/validationSchema";
import AppError from "../utils/AppError";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error);

  if (error instanceof z.ZodError) return handleZodError(res, error);

  if (error instanceof AppError) return handleAppError(res, error);

  return res
    .status(INTERNAL_SERVER_ERROR)
    .send("Internal Server Error " + error);
};

export default errorHandler;
