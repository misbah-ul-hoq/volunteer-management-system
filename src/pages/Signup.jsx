import SignupForm from "../components/forms/SignupForm";
import useDocumentTitle from "../hooks/useDocumentTitle";

const SignupPage = () => {
  useDocumentTitle("Signup");
  return (
    <div>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
