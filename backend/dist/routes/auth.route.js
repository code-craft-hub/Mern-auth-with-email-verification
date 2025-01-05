"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authRoutes = express_1.default.Router();
authRoutes.post("/register", auth_controller_1.registerHandler);
authRoutes.post("/login", auth_controller_1.loginHandler);
authRoutes.get("/logout", auth_controller_1.logoutHandler);
authRoutes.get("/refresh", auth_controller_1.refreshHandler);
authRoutes.get("/email/verify/:code", auth_controller_1.verifyEmailHander);
authRoutes.post("/password/forgot", auth_controller_1.sendPasswordResetHandler);
authRoutes.post("/password/reset", auth_controller_1.resetPasswordHandler);
exports.default = authRoutes;
