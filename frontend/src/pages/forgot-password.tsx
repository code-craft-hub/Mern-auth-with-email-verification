import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "../lib/api";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const {
    mutate: updateEmail,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: sendPasswordResetEmail,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>

        {isSuccess ? (
          <div className="bg-green-500 p-4 text-center">
            Check your email and continue with your password reset
          </div>
        ) : (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && updateEmail(email)}
                    required
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => updateEmail(email)}
                  disabled={!email}
                  className="flex disabled:cursor-not-allowed disabled:bg-indigo-200 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {isPending ? "Submitting..." : "Resent password"}
                </button>
              </div>
            </form>
            {isError && <div>Invalid email or password</div>}

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              visit home page?{" "}
              <Link
                to="/"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Home
              </Link>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPasswordPage;
