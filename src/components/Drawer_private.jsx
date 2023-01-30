import React, { useState } from "react";
import { Button, Card, Descriptions, Drawer } from "antd";
import { useStoreAuth } from "../store/authStore";
import { PoweroffOutlined, ScissorOutlined } from "@ant-design/icons";
import * as config from "./../config";
import { useStoreName } from "../store/namesStore";
import Modal_ChangePW from "./Modal_ChangePW";
import { useNavigate } from "react-router-dom";
const host = config.LOCAL_DEV_URL;
const Drawer_private = ({ setVisible, visible }) => {
  const setAuth = useStoreAuth((state) => state.setAuth);
  const auth = useStoreAuth((state) => state.auth);
  const setNameList = useStoreName((state) => state.setNameList);
  const setName = useStoreName((state) => state.setName);
  const setId = useStoreName((state) => state.setId);

  const [visibleModalChangePW, setVisibleModalChangePW] = useState(false);

  const navigate = useNavigate();
  return (
    <Drawer
      placement="right"
      closable={false}
      onClose={() => setVisible(false)}
      visible={visible}
      key="right"
    >
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        {/* 사진 */}
        <div className="align-center">
          <img
            style={{
              borderRadius: "50%",
              width: "10em",
              height: "10em",
              objectFit: "contain",
              boxShadow: "0 0 12px rgba(0, 0, 0, 0.2)",
            }}
            // src="/images/200001.png"
            src={`${host}/static/photo/${auth.employee_number}.png`}
            onError={(e) => {
              e.target.src = "images/picture/user.png";
            }}
            alt="장병사진"
          />
        </div>

        {/* 계급, 이름 */}
        <div className="flex-center-column margin-2em">
          <span className="font-l weight-xl">{auth?.person_name}</span>
          <span
            style={{ color: "#197340" }}
            className="font-xs weight-l margin-05em"
          >
            {auth?.grade_name}
          </span>
          <span className="font-xs weight-l">{auth?.organization_name}</span>
        </div>
        {/* 병사기본정보 */}
        <div className="flex-between-row">
          <div className="flex-center-column margin-05em">
            <span className="font-xs weight-m margin-05em">키</span>
            <span className="box-m font-m weight-xl">{`${auth?.height}cm`}</span>
          </div>

          <div className="flex-center-column margin-05em">
            <span className="font-xs weight-m margin-05em">몸무게</span>
            <span className="box-m font-m weight-xl">{`${auth?.weight}kg`}</span>
          </div>

          <div className="flex-center-column margin-05em">
            <span className="font-xs weight-m margin-05em">나이</span>
            <span className="box-m font-m weight-xl">{`${auth?.age}`}</span>
          </div>
        </div>

        <Button
          style={{ width: "100%" }}
          size="large"
          className="changePWBtn"
          onClick={() => {
            setVisibleModalChangePW(true);
          }}
          icon={<ScissorOutlined />}
        >
          비밀번호 변경
        </Button>

        <Button
          style={{ width: "100%" }}
          size="large"
          className="logOutBtn"
          onClick={() => {
            sessionStorage.removeItem("userInfo");
            sessionStorage.removeItem("soldierNames");
            setNameList([]);
            setName();
            setId();
            setAuth();
            navigate("/login");
          }}
          icon={<PoweroffOutlined />}
        >
          로그아웃
        </Button>

        <img
          src="/images/logo/strong.PNG"
          alt=""
          className="logo"
          style={{ width: "100%" }}
        />
      </Card>

      <Modal_ChangePW
        visible={visibleModalChangePW}
        setVisible={setVisibleModalChangePW}
      />
    </Drawer>
  );
};

export default Drawer_private;
