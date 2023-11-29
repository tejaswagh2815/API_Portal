import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer, Header } from "./components";

const Layout = () => {
  const location = useLocation();

  const shouldRenderHeader = location.pathname !== "/login";
  // const shouldRenderFooter = location.pathname !== "/login";
  return (
    <>
      {shouldRenderHeader && <Header />}
      <Outlet />
      {/* {shouldRenderFooter && <Footer />} */}
    </>
  );
};

export default Layout;
