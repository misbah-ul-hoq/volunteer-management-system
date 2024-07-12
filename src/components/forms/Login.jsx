import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import api from "../../axios/fetch";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { logInWithEmailAndPassword, signInWithGoogle } =
    useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    logInWithEmailAndPassword(email, password)
      .then(() => {
        Swal.fire({
          text: "Login Successfull",
          icon: "success",
        }).then(() => {
          navigate(location.state ? location.state : "/");
        });
      })
      .catch((error) => {
        Swal.fire({
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <div
      className="hero bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url(/animated-bg.jpg)",
        minHeight: "calc(100vh - 68px)",
      }}
    >
      <div className="hero-content">
        <div
          className="card w-full max-w-sm shrink-0 shadow-2xl border border-base-100"
          style={{ backdropFilter: "blur(30px)" }}
        >
          <form className="card-body pb-0" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <img
                src={`${showPassword ? "/eye-off.svg" : "/eye-on.svg"}`}
                alt=""
                className="h-10 absolute right-4 bottom-1 cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            </div>
            <div className="form-control mt-4">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>

          <div className="divider mx-8">OR</div>

          <button
            className="flex items-center btn mx-8"
            onClick={() => {
              signInWithGoogle()
                .then((currentUser) => {
                  // const user = userCredential.user;
                  api.post(
                    "/jwt",
                    {
                      email: currentUser.user.email,
                    },
                    { withCredentials: true }
                  );
                  Swal.fire({
                    text: "Login Successfull",
                    icon: "success",
                  }).then(() => {
                    navigate(location.state ? location.state : "/");
                  });
                })
                .catch((error) => {
                  Swal.fire({
                    text: error.message,
                    icon: "error",
                  });
                });
            }}
          >
            <img
              src="/google.svg"
              alt="google logo"
              className="h-7 w-7 object-cover"
            />
            Login with google
          </button>

          <div className="pt-2 text-center pb-6">
            Dont have an account ?{" "}
            <Link to="/signup" className="text-purple-600 text-lg">
              SignUp
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
