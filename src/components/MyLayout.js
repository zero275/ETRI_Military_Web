import React from "react";
import { Outlet } from "react-router-dom";

const MyLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MyLayout;
