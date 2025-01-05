"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.verificationCodeSchema = exports.registerSchema = exports.loginSchema = exports.emailSchema = exports.handleAppError = exports.handleZodError = void 0;
const zod_1 = require("zod");
const http_1 = require("../constants/http");
const handleZodError = (res, error) => {
    const errors = error.issues.map((err) => ({
        path: err.path.join("."),
        message: err.message,
    }));
    return res.status(http_1.BAD_REQUEST).json({
        message: error.message,
        errors,
    });
};
exports.handleZodError = handleZodError;
const handleAppError = (res, error) => {
    return res.status(error.statusCode).json({
        message: error.message,
        errorCode: error.errorCode,
    });
};
exports.handleAppError = handleAppError;
exports.emailSchema = zod_1.z.string().email().min(1).max(255);
const passwordSchema = zod_1.z.string().min(6).max(255);
exports.loginSchema = zod_1.z.object({
    email: exports.emailSchema,
    password: passwordSchema,
    userAgent: zod_1.z.string().optional(),
});
exports.registerSchema = exports.loginSchema
    .extend({
    confirmPassword: passwordSchema,
})
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
exports.verificationCodeSchema = zod_1.z.string().min(1).max(24);
exports.resetPasswordSchema = zod_1.z.object({
    password: passwordSchema,
    verificationCode: exports.verificationCodeSchema
});
