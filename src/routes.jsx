import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./RootLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import ErrorPage from "./pages/ErrorPage";
import AddVolunteer from "./pages/AddVolunteer";
import PrivateRoute from "./pages/PrivateRoute";
import VolunteerDetails from "./pages/VolunteerDetails";
import AllVolunteers from "./pages/AllVolunteers";
import MyPosts from "./pages/MyPosts";
import UpdatePage from "./pages/UpdatePage";
import api from "./axios/fetch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/need-volunteer",
        element: <AllVolunteers />,
      },
      {
        path: "/add-volunteer",
        element: (
          <PrivateRoute>
            <AddVolunteer />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-posts",
        element: (
          <PrivateRoute>
            <MyPosts />
          </PrivateRoute>
        ),
      },
      {
        path: "/volunteers/:id",
        element: (
          <PrivateRoute>
            <VolunteerDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/volunteers/update/:id",

        element: (
          <PrivateRoute>
            <UpdatePage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;
