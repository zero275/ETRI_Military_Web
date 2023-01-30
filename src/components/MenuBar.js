import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Menu } from "antd";
import {
  AppstoreOutlined,
  DashboardOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  HeartOutlined,
  MedicineBoxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RadarChartOutlined,
  ReconciliationOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useStoreAuth } from "../store/authStore";
import { getMenuItemsByAuth } from "../util/myFunctions";

const { SubMenu } = Menu;

const MenuBar = ({ collapsed, setCollapsed, toggleCollapsed }) => {
  const auth = useStoreAuth((state) => state.auth);
  const navigate = useNavigate();
  const [current, setCurrent] = useState("Total");
  const [menuItems, setMenuItems] = useState([]);
  const changeCurrent = ({ item, key, keyPath, domEvent }) => {
    setCurrent(key);
    navigate(key, { replace: true });
  };

  useEffect(() => {
    const tempMenuItems = getMenuItemsByAuth(auth);
    setMenuItems(tempMenuItems);
  }, [auth]);

  return (
    <>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{ marginBottom: 16, width: "100%" }}
      >
        {collapsed ? (
          <DoubleRightOutlined style={{ fontSize: "1.5em" }} />
        ) : (
          <DoubleLeftOutlined style={{ fontSize: "1.5em" }} />
        )}
      </Button>
      <Menu
        style={{ flex: 8 }}
        // mode="horizontal"
        mode="inline"
        defaultSelectedKeys={[current]}
        selectedKeys={[current]}
        onClick={changeCurrent}
        theme="dark"
        items={menuItems}
      />
    </>
  );
};

export default MenuBar;
