import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../lib/api";

const VerifyEmailPage = () => {
  const navigate = useNavigate();

  const { code } = useParams();

  const { isPending, isSuccess, isError } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code),
  });

  if (isPending) return <div> Loading...</div>;

  if (isSuccess)
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
  return (
    <>
      {isError && <div className="bg-red-500">Couldn't verify your token</div>}
      {isSuccess && <div className="bg-green-400">Token verified</div>}
    </>
  );
};

export default VerifyEmailPage;
