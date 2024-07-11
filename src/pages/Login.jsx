import LoginForm from "../components/forms/Login";
import useDocumentTitle from "../hooks/useDocumentTitle";

const LoginPage = () => {
  useDocumentTitle("Login");
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
