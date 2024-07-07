import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="skeleton h-32 w-32 my-10 mx-auto"></div>;
  }
  if (user) {
    return <div>{children}</div>;
  }
  return <Navigate to="/login" state={location.pathname} />;
};

export default PrivateRoute;
