"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const resend_1 = __importDefault(require("../config/resend"));
const sendMail = async ({ to, subject, text, html }) => await resend_1.default.emails.send({
    from: "onboarding@codecrafthub.site",
    to: "onlinehassle1234@gmail.com",
    subject,
    text,
    html,
});
exports.sendMail = sendMail;
