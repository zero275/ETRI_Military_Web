import { FrownOutlined } from "@ant-design/icons";
import { Card, Col, Result, Row } from "antd";
import React from "react";

const InfoPage = () => {
  return (
    <>
      <Result
        className="infopage"
        icon={<FrownOutlined />}
        title="먼저 병사를 조회해주세요!"
      />
    </>
  );
};

export default InfoPage;
