import { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

const NavBar = () => {
  const { user, signOutUser, userMongo } = useContext(AuthContext);

  const [volunteerTheme, setTheme] = useState(
    localStorage.getItem("volunteerTheme")
      ? localStorage.getItem("volunteerTheme")
      : "emerald"
  );

  const handleTheme = (e) => {
    if (e.target.checked) {
      setTheme("emerald");
    } else {
      setTheme("dim");
    }
  };

  useEffect(() => {
    localStorage.setItem("volunteerTheme", volunteerTheme);
    const localTheme = localStorage.getItem("volunteerTheme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [volunteerTheme]);

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/need-volunteer">Need Volunteer</NavLink>
      </li>
      <li>
        <NavLink to="/add-volunteer">Add Volunteer</NavLink>
      </li>
      <li>
        <NavLink to="/my-posts">My posts</NavLink>
      </li>
      {!user && (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
      {user && (
        <button
          className="ml-2 pl-1"
          onClick={() => {
            signOutUser().then(() => {
              Swal.fire({
                title: "Sign Out Successfull",
                icon: "success",
              });
            });
          }}
        >
          Logout
        </button>
      )}
    </>
  );

  return (
    <nav className="navbar h-12 lg:px-10 bg-secondary text-secondary-content text-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm text-lg dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-base-content space-y-4"
          >
            {navLinks}
          </ul>
        </div>

        <Link to="/" className="flex gap-2 items-center">
          <img src="/logo.svg" alt="" className="h-6" />
          <span>VM</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal text-lg px-1">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        <label className="swap swap-rotate">
          {/* this hidden checkbox controls the state */}
          <input
            type="checkbox"
            onChange={handleTheme}
            checked={volunteerTheme === "emerald"}
          />

          {/* sun icon */}
          <svg
            className="swap-on h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>

          {/* moon icon */}
          <svg
            className=" swap-off h-10 w-10 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        {/* profile and logout buttons will be added here */}
        {user && (
          <div className="cursor-pointer mt-2 ml-3">
            <div className="rounded-full dropdown dropdown-end dropdown-hover">
              <img
                role="button"
                tabIndex={0}
                className="w-10 h-10 rounded-full object-cover"
                src={user.photoURL || userMongo?.photoURL || ""}
              />

              <ul className="dropdown-content p-4 rounded-lg w-52 menu bg-base-200 z-10 text-base-content space-y-3">
                <p className="text-center text-lg">{user.displayName}</p>
                <Link
                  to="/add-volunteer"
                  className="text-center underline py-1"
                >
                  Add volunteer
                </Link>
                <Link
                  to="/manage-my-post"
                  className="text-center underline py-1"
                >
                  Manage my post
                </Link>
                <button
                  onClick={() => {
                    signOutUser().then(() => {
                      Swal.fire({
                        title: "Logout successfull",
                        icon: "success",
                      });
                    });
                  }}
                  className="btn btn-warning"
                >
                  Logout
                </button>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
