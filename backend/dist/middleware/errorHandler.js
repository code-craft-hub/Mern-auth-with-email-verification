"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("../constants/http");
const zod_1 = require("zod");
const auth_schemas_1 = require("../validation-schemas/auth.schemas");
const AppError_1 = __importDefault(require("../utils/AppError"));
const cookies_1 = require("../utils/cookies");
const errorHandler = (error, req, res, next) => {
    console.log(`PATH: ${req.path}`, error);
    if (req.path === cookies_1.REFRESH_PATH)
        (0, cookies_1.clearAuthCookies)(res);
    if (error instanceof zod_1.z.ZodError)
        return (0, auth_schemas_1.handleZodError)(res, error);
    if (error instanceof AppError_1.default)
        return (0, auth_schemas_1.handleAppError)(res, error);
    return res
        .status(http_1.INTERNAL_SERVER_ERROR)
        .send("Internal Server Error " + error);
};
exports.default = errorHandler;
