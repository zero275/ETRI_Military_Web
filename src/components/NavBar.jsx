import { UserOutlined } from "@ant-design/icons";
import { Button, Layout, Row } from "antd";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useStoreAuth } from "../store/authStore";
import MenuBar from "./MenuBar";

const { Header, Sider } = Layout;
const NavBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <MenuBar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        toggleCollapsed={toggleCollapsed}
      />
    </Sider>
  );
};

export default NavBar;
