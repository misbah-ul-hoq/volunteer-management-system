import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import api from "../../axios/fetch";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const { signUpWithEmailAndPassword, signInWithGoogle } =
    useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const photoURL = form.get("photoURL");

    if (!/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(password)) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Please fillup the password criteria!",
      });
      return;
    }

    signUpWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.displayName = name;

        // creating user in mongodb after successfull signup from firebase, so that user is not duplicated in mongodb
        api.post("/users/create", {
          name,
          email,
          password,
          photoURL,
        });

        Swal.fire({
          icon: "success",
          title: "Signup sucessfull",
          text: "You have signed up successfully.",
        });
      })
      .catch((error) =>
        Swal.fire({
          text: error.message,
          icon: "error",
        })
      );
  };

  return (
    <div className="grid lg:grid-cols-2 gap-5 items-center container-center py-2 md:py-5">
      <div className="illustrator order-1 lg:order-0 mx-auto">
        <img src="/signup-illustrator.svg" alt="" className="w-full" />
      </div>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-lg ">
          <h2 className="text-3xl font-extrabold text-center">
            Create an account
          </h2>
          <button
            className="w-full py-2 mt-2 font-semibold rounded-lg btn btn-primary text-white"
            onClick={() => {
              signInWithGoogle()
                .then(() => {
                  Swal.fire({
                    text: "Sign up successfull",
                    icon: "success",
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
            <div className="flex items-center justify-center">
              <img
                src="/google.svg"
                alt="Google Logo"
                className="w-5 h-5 mr-2 object-cover"
              />
              Sign up with Google
            </div>
          </button>
          <div className="divider">OR</div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="What should we call you?"
                className="block w-full px-4 py-2 mt-1 bg-base-200 border rounded-lg"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="block w-full px-4 py-2 mt-1 bg-base-200 border rounded-lg"
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="block w-full px-4 py-2 mt-1 bg-base-200 border border-gray-300 rounded-lg"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <img
                src={`${showPassword ? "/eye-off.svg" : "/eye-on.svg"}`}
                alt=""
                className="h-10 absolute right-4 bottom-6"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
              <div className="mt-1 text-xs flex items-center gap-3">
                <span className="flex items-center">
                  <img
                    src={password.length >= 6 ? "/right.svg" : "/cross.svg"}
                    alt=""
                    className="h-5"
                  />
                  Minimum 6 characters
                </span>
                <span className="flex items-center">
                  <img
                    src={/[A-Z]/.test(password) ? "/right.svg" : "/cross.svg"}
                    alt=""
                    className="h-5"
                  />
                  One Uppercase
                </span>
                <span className="flex items-center">
                  <img
                    src={/[a-z]/.test(password) ? "/right.svg" : "/cross.svg"}
                    alt=""
                    className="h-5"
                  />
                  One lowercase
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="photoURL" className="block text-sm font-medium">
                Photo URL
              </label>
              <input
                type="text"
                id="photoURL"
                name="photoURL"
                placeholder="Enter your photoURL"
                className="block w-full px-4 py-2 mt-1 bg-base-200 border rounded-lg"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-block text-white"
            >
              Create account
            </button>
          </form>
          <p className="mt-4 text-sm text-center">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-medium text-secondary hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
