import { CREATED } from "../constants/http";
import { createAccount } from "../services/auth.service";
import { catchErrors } from "../utils/catchErrors";
import { setAuthCookies } from "../utils/cookies";
import {
  loginSchema,
  registerSchema,
} from "../validation-schemas/validationSchema";

export const registerHandler = catchErrors(async (req, res) => {
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user, accessToken, refreshToken } = await createAccount(request);

  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  const request = loginSchema.parse(req.body);
});