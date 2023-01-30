import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const IsUserLoggedIn = ({ auth, location }) => {
  const next = useLocation();
  return (
    <>
      {auth ? (
        <Navigate to="/Total" state={{ from: next }} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default IsUserLoggedIn;
