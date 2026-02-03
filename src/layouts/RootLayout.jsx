import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const RootLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default RootLayout;
