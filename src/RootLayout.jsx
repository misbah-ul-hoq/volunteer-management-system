import { Outlet } from "react-router-dom";
import NavBar from "./components/shared/NavBar";
import Footer from "./components/shared/Footer";

const RootLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default RootLayout;
