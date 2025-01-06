import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AppContainer = () => {
  const { user, isLoading } = useAuth();

  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : user ? (
        JSON.stringify(user, null, 2)
      ) : (
        <Navigate
          to={"login"}
          replace
          state={{ redirectUrl: window.location.pathname }}
        />
      )}
    </>
  );
};

export default AppContainer;
