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
  Switch,
  Radio,
  Tooltip,
} from "antd";

import Drawer_private from "../../../../components/Drawer_private";
import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import BarChart_month from "../charts/BarChart_month";
import BarChart_week from "../charts/BarChart_week";
import BarChart_Total from "../charts/BarChart_Total";
import moment from "moment";
import SliderButton from "../../../../components/sliderButton";
const Private = ({
  auth,
  behavioralResult,
  recentBehavioralResult,
  _getBehavioralResult,
  date,
  setDate,
}) => {
  const [visible, setVisible] = useState(false);

  const [type, setType] = useState("주");
  const [detailData, setDetailData] = useState([]);
  const [visibleDetail, setVisibleDetail] = useState(false);
  return (
    <>
      <SliderButton setVisible={setVisible} auth={auth} />
      <Card className="divide_bg">
        <Row gutter={[16, 16]}>
          <Col span={24} className="divide_top_wr">
            <div className="margin-1em">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>STRONG</Breadcrumb.Item>
                <Breadcrumb.Item>행동심리</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            {/* 나의 최신 */}
            <div>
              <span className="font-m weight-s">
                {" "}
                <UnorderedListOutlined
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "bold",
                  }}
                />{" "}
                심리상태 분석 결과{" "}
              </span>
              <Tooltip
                placement="topLeft"
                title={recentBehavioralResult?.datelatest}
                color="green"
              >
                <span
                  style={{ color: "green", cursor: "pointer" }}
                  className="font-m weight-s"
                >
                  (가장 최근 데이터)
                </span>
              </Tooltip>
              <div style={{ margin: "1em 0em" }} className="card-m-container">
                <div className="card-m">
                  <span className="font-l weight-l">
                    {recentBehavioralResult.hrv_index}
                  </span>
                  <span className="font-xs weight-xs margin-b-1em">
                    스트레스 저항성
                  </span>
                </div>

                <div className="card-m">
                  <span className="font-l weight-l">
                    {recentBehavioralResult.hrv_ans}
                  </span>
                  <span className="font-xs weight-xs margin-b-1em">
                    신체 활력도
                  </span>
                </div>

                {/* <div className="card-m">
                  <span className="font-l weight-l">
                    {recentBehavioralResult.brain_att}
                  </span>
                  <span className="font-xs weight-xs margin-b-1em">집중력</span>
                </div>

                <div className="card-m">
                  <span className="font-l weight-l">
                    {recentBehavioralResult.brain_med}
                  </span>
                  <span className="font-xs weight-xs margin-b-1em">이완력</span>
                </div> */}
              </div>

              <div className="flex-first-row">
                <img
                  src="/images/etc/body.png"
                  alt="사람 신체"
                  style={{
                    height: "30em",
                  }}
                />
                <BarChart_Total data={recentBehavioralResult} />
              </div>
            </div>

            {/* 기간 별 */}

            <div style={{ marginTop: "1.5em" }}>
              <span className="font-m weight-s">
                {" "}
                <UnorderedListOutlined
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "bold",
                  }}
                />{" "}
                심리상태 분석 결과 (기간)
              </span>
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  marginBottom: "1em",
                }}
              >
                <DatePicker
                  style={{ flex: "8", marginRight: "1em" }}
                  format={"YYYY-MM-DD"}
                  value={date && moment(date)}
                  placeholder="기간 선택"
                  onChange={(date, dateString) => {
                    setDate(dateString);
                  }}
                />
                <Radio.Group
                  style={{ flex: "1" }}
                  onChange={(e) => setType(e.target.value)}
                  name="radiogroup"
                  defaultValue={"주"}
                >
                  <Radio value={"주"}>주</Radio>
                  <Radio value={"월"}>월</Radio>
                </Radio.Group>
                <Button
                  style={{ flex: "1" }}
                  onClick={() =>
                    _getBehavioralResult(auth.employee_number, date, type)
                  }
                >
                  조회
                </Button>
              </div>
              <table className="table_st">
                <thead className="table_header">
                  <tr>
                    <th style={{ fontSize: "1.2em" }}>분류</th>
                    <th style={{ fontSize: "1.2em" }}>
                      기간 {behavioralResult?.datebegin} ~{" "}
                      {behavioralResult?.dateend}
                    </th>
                    <th style={{ fontSize: "1.2em" }}>통계</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>스트레스 저항성</td>
                    <td>
                      {behavioralResult.weekormonth === "주" ? (
                        <>
                          {behavioralResult?.hrvindexlist && (
                            <BarChart_week
                              arr={behavioralResult?.hrvindexlist}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {behavioralResult?.hrvindexlist && (
                            <BarChart_month
                              arr={behavioralResult?.hrvindexlist}
                            />
                          )}
                        </>
                      )}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          setVisibleDetail(true);
                          setDetailData(behavioralResult?.hrvindexstat);
                        }}
                      >
                        상세보기
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>신체 활력도</td>
                    <td>
                      {behavioralResult.weekormonth === "주" ? (
                        <>
                          {behavioralResult?.hrvanslist && (
                            <BarChart_week arr={behavioralResult?.hrvanslist} />
                          )}
                        </>
                      ) : (
                        <>
                          {behavioralResult?.hrvanslist && (
                            <BarChart_month
                              arr={behavioralResult?.hrvanslist}
                            />
                          )}
                        </>
                      )}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          setVisibleDetail(true);
                          setDetailData(behavioralResult?.hrvansstat);
                        }}
                      >
                        상세보기
                      </Button>
                    </td>
                  </tr>
                  {/* <tr>
                    <td>집중력</td>
                    <td>
                      {behavioralResult.weekormonth === "주" ? (
                        <>
                          {behavioralResult?.brainattlist && (
                            <BarChart_week
                              arr={behavioralResult?.brainattlist}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {behavioralResult?.brainattlist && (
                            <BarChart_month
                              arr={behavioralResult?.brainattlist}
                            />
                          )}
                        </>
                      )}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          setVisibleDetail(true);
                          setDetailData(behavioralResult?.brainattstat);
                        }}
                      >
                        상세보기
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>이완력</td>
                    <td>
                      {behavioralResult.weekormonth === "주" ? (
                        <>
                          {behavioralResult?.brainmedlist && (
                            <BarChart_week
                              arr={behavioralResult?.brainmedlist}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {behavioralResult?.brainmedlist && (
                            <BarChart_month
                              arr={behavioralResult?.brainmedlist}
                            />
                          )}
                        </>
                      )}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          setVisibleDetail(true);
                          setDetailData(behavioralResult?.brainmedstat);
                        }}
                      >
                        상세보기
                      </Button>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Card>
      <Modal
        title={`상세보기`}
        visible={visibleDetail}
        width={500}
        closable={true}
        okText="닫기"
        onOk={() => setVisibleDetail(false)}
        onCancel={() => setVisibleDetail(false)}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Descriptions bordered>
          <Descriptions.Item label="최대 수치" span={3}>
            {detailData?.max}
          </Descriptions.Item>
          <Descriptions.Item label="최소 수치" span={3}>
            {detailData?.min}
          </Descriptions.Item>
          <Descriptions.Item label="평균 수치" span={3}>
            {detailData?.avg?.toFixed(1)}
          </Descriptions.Item>
        </Descriptions>
      </Modal>
      <Drawer_private setVisible={setVisible} visible={visible} />
    </>
  );
};

export default Private;
