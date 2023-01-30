import axios from "axios";
import React from "react";
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useStoreAuth } from "../store/authStore";

const RequireAuth = ({ allowedRoles }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const param = useParams();
  const from = location.state?.from?.pathname || "/";
  const auth = useStoreAuth((state) => state.auth);
  const setAuth = useStoreAuth((state) => state.setAuth);

  return auth ? (
    <Outlet />
  ) : auth ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <>
      <Navigate to="/login" state={{ from: location }} replace />
    </>
  );

  //   return auth?.role?.find((role) => allowedRoles?.includes(role)) ? (
  //     <Outlet />
  //   ) : auth?.role ? (
  //     <Navigate to="/unauthorized" state={{ from: location }} replace />
  //   ) : (
  //     <>
  //       <Navigate to="/login" state={{ from: location }} replace />
  //       {/* {console.log("role")} */}
  //     </>
  //   );
};

export default RequireAuth;
