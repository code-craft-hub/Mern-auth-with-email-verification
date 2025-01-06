import API from "../config/apiClient";

export const login = async (data: any) => API.post("/api/auth/login", data);
export const register = async (data: any) =>
  API.post("/api/auth/register", data);

export const verifyEmail = async (verificationCode: any) =>
  API.get(`/api/auth/email/verify/${verificationCode}`);

export const sendPasswordResetEmail = async (email: string) =>
  API.post("/api/auth/password/forgot", { email });

export const resetPassword = async ({ verificationCode, password }: any) =>
  API.post("/api/auth/password/reset", { verificationCode, password });

export const getUser = async () => API.get("/api/user");

export const fetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody.message || "An error occurred");
  }

  return response.json();
};
