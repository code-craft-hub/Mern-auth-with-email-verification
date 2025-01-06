import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import ForgotPasswordPage from "./pages/forgot-password";
import RegisterPage from "./pages/register";
import VerifyEmailPage from "./pages/verify-email";
import ResetPassword from "./pages/ResetPassword";
import HomePage from "./pages/home";
import AppContainer from "./component/app-container";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppContainer />} >
      <Route
        index
        element={
          <HomePage />
        }
      /></Route>
      <Route element={<LoginPage />} path="/login" />
      <Route element={<RegisterPage />} path="/register" />
      <Route element={<VerifyEmailPage />} path="/email/verify/:code" />
      <Route element={<ForgotPasswordPage />} path="/password/forgot" />
      <Route element={<ResetPassword />} path="/password/reset" />
    </Routes>
  );
}

export default App;
