import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

const SliderButton = ({ auth, setVisible }) => {
  return (
    <>
      <Button
        style={{
          position: "fixed",
          right: "4em",
          top: "3.6em",
          width: "3em",
          height: "3em",
          zIndex: "10",
          borderRadius: "50%",
        }}
        onClick={() => setVisible(true)}
      >
        <UserOutlined />
      </Button>
      <span
        style={{
          position: "fixed",
          right: "9em",
          top: "3.8em",
          width: "fit-content",
          height: "3em",
          zIndex: "10",
          textAlign: "center",
          lineHeight: "3em",
          borderBottom: "3px solid gray",
          fontSize: "1em",
        }}
      >
        {auth.person_name}
      </span>
    </>
  );
};

export default SliderButton;
