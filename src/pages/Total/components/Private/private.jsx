import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Card,
  Modal,
  Input,
  Select,
  Table,
  Button,
  Spin,
  DatePicker,
  Upload,
  Descriptions,
} from "antd";
import GaugeCompo from "../charts/GaugeCompo";
import IntroColumn from "../charts/IntroGraph";
import Drawer_private from "../../../../components/Drawer_private";
import { UserOutlined } from "@ant-design/icons";
import SliderButton from "../../../../components/sliderButton";
const Private = ({ auth, totalList }) => {
  const [introGraphData, setIntroGraphData] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setIntroGraphData([
      {
        type: "데일리활동량",
        y: Number(totalList?.activity),
      },
      { type: "체력관리", y: Number(totalList?.pt_index) },
      { type: "행동심리", y: Number(totalList?.behavior) },
      { type: "부상안전도", y: Number(totalList?.injury_index) },
      { type: "복무적응도", y: Number(totalList?.ready_index) },
      // { type: "사고안전도", y: Number(totalList?.safe_index) },
      // {
      //   type: "인재역량",
      //   y: Number(totalList?.talent_index),
      // },
    ]);
  }, [totalList, auth]);

  return (
    <>
      <SliderButton setVisible={setVisible} auth={auth} />
      <Card className="divide_bg">
        <Row gutter={[16, 16]}>
          <Col span={24} className="divide_top_wr">
            <div className="margin-1em">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>STRONG</Breadcrumb.Item>
                <Breadcrumb.Item>종합지수</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div className="flex-between-row" style={{ minWidth: "1000px" }}>
              {/* Strong 지수 */}
              <Card
                style={{ width: "49%", minWidth: "400px", textAlign: "center" }}
                className=" padding-1em margin-1em border-radius10px"
              >
                <span
                  style={{ display: "block" }}
                  className="font-s weight-l margin-b-1em"
                >
                  스트롱 지수
                </span>
                <GaugeCompo
                  content={`STRONG지수`}
                  offsetY={-40}
                  value={parseInt(totalList?.strong_index)}
                  _width={260}
                />
              </Card>
              {/* 종합 지수 */}
              <Card
                style={{ width: "49%", minWidth: "500px", textAlign: "center" }}
                className=" padding-1em margin-1em border-radius10px"
              >
                <span
                  style={{ display: "block" }}
                  className="font-s weight-l margin-b-1em "
                >
                  종합 지수
                </span>
                <IntroColumn arr={introGraphData} what="intro" />
              </Card>
            </div>
          </Col>
        </Row>
      </Card>
      <Drawer_private setVisible={setVisible} visible={visible} />
    </>
  );
};

export default Private;
