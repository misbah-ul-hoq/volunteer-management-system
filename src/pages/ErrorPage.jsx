import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 60px)" }}
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-center">Page not found</h2>
        <img src="/404.svg" alt="" className="mx-auto" />
        <Link
          className="btn btn-primary w-36 flex mx-auto justify-center"
          to="/"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
