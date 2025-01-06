import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPassword } from "../lib/api";
import { useMutation } from "@tanstack/react-query";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const verificationCode = searchParams.get("code");
  const exp = Number(searchParams.get("exp"));
  const now = Date.now();


  const linkIsValid = verificationCode && exp && exp > now;

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {
    mutate: updatePassword,
    isPending,
    isError,
  } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  if (!linkIsValid) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center">
        <div className="shadow-xl p-4 w-full max-w-screen-md rounded-lg mx-auto place-self-center align-middle flex flex-col justify-center items-center gap-4">
          <p className="bg-red-500 p-4 w-fit rounded-lg">
            Expired or Invalid code
          </p>
          <Link to={"/"} className="">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

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

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    updatePassword({ verificationCode, password })
                  }
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => updatePassword({ verificationCode, password })}
                disabled={password.length < 6}
                className="flex disabled:cursor-not-allowed disabled:bg-indigo-200 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isPending ? "Resetting..." : "Reset password"}
              </button>
            </div>
          </form>
          {isError && <div>password is too weak</div>}
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
