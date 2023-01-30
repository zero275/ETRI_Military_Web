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
  Radio,
  Tooltip,
} from "antd";
import Drawer_private from "../../../../components/Drawer_private";
import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import BarChart_week from "../charts/BarChart_week";
import BarChart_month from "../charts/BarChart_month";
import BarChart_lastest from "../charts/BarChart_lastest";
import * as config from "../../../../config";
import moment from "moment";
import SliderButton from "../../../../components/sliderButton";
const host = config.LOCAL_DEV_URL;
const Private = ({
  auth,
  injuryResult,
  _getInjuryResult,
  recentInjuryResult,
  setDate,
  date,
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
                <Breadcrumb.Item>부상안전도</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <span className="font-m weight-s">
                {" "}
                <UnorderedListOutlined
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "bold",
                  }}
                />{" "}
                무릎 부상 안전도{" "}
              </span>
              <Tooltip
                placement="topLeft"
                title={recentInjuryResult?.datelatest}
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
                    {recentInjuryResult.injurysafe_l}
                  </span>
                  <span className="font-xs weight-xs margin-b-1em">
                    부상안전도 (왼쪽)
                  </span>
                </div>
                {/* 
                <div className="card-m">
                  <span className="font-l weight-l">
                    {recentInjuryResult.injuryrisk_l}
                  </span>
                  <span className="font-xs weight-xs margin-b-1em">
                    부상위험도 (왼쪽)
                  </span>
                </div> */}

                <div className="card-m">
                  <span className="font-l weight-l">
                    {recentInjuryResult.injurysafe_r}
                  </span>
                  <span className="font-xs weight-xs margin-b-1em">
                    부상안전도 (오른쪽)
                  </span>
                </div>
                {/* 
                <div className="card-m">
                  <span className="font-l weight-l">
                    {recentInjuryResult.injuryrisk_r}
                  </span>
                  <span className="font-xs weight-xs margin-b-1em">
                    부상위험도 (오른쪽)
                  </span>
                </div> */}
              </div>

              <div
                style={{ textAlign: "center", margin: "auto" }}
                className="flex-first-row"
              >
                <BarChart_lastest
                  safepoints_l={recentInjuryResult.safepoints_l}
                  safepoints_r={recentInjuryResult.safepoints_r}
                />
              </div>
            </div>

            <div style={{ marginTop: "1.5em" }}>
              <span className="font-m weight-s">
                {" "}
                <UnorderedListOutlined
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "bold",
                  }}
                />{" "}
                무릎 부상 안전도 (기간)
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
                  placeholder="기간 선택"
                  value={date && moment(date)}
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
                    _getInjuryResult(auth.employee_number, date, type)
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
                      기간 {injuryResult?.datebegin} ~ {injuryResult?.dateend}
                    </th>
                    <th style={{ fontSize: "1.2em" }}>통계</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>왼쪽 무릎</td>
                    <td>
                      {injuryResult.weekormonth === "주" ? (
                        <>
                          {injuryResult?.riskpoints_l_list && (
                            <BarChart_week
                              arr={injuryResult?.riskpoints_l_list}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {injuryResult?.riskpoints_l_list && (
                            <BarChart_month
                              arr={injuryResult?.riskpoints_l_list}
                            />
                          )}
                        </>
                      )}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          setVisibleDetail(true);
                          setDetailData(injuryResult?.recommend_l);
                        }}
                      >
                        추천운동 보기
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>오른쪽 무릎</td>
                    <td>
                      {injuryResult.weekormonth === "주" ? (
                        <>
                          {injuryResult?.riskpoints_r_list && (
                            <BarChart_week
                              arr={injuryResult?.riskpoints_r_list}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {injuryResult?.riskpoints_r_list && (
                            <BarChart_month
                              arr={injuryResult?.riskpoints_r_list}
                            />
                          )}
                        </>
                      )}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          setVisibleDetail(true);
                          setDetailData(injuryResult?.recommend_r);
                        }}
                      >
                        추천운동 보기
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
      </Card>
      <Modal
        title={`추천운동 보기`}
        visible={visibleDetail}
        width={500}
        closable={true}
        okText="닫기"
        onOk={() => setVisibleDetail(false)}
        onCancel={() => setVisibleDetail(false)}
        cancelButtonProps={{ style: { display: "none" } }}
        bodyStyle={{ height: "550px", overflowX: "scroll" }}
      >
        {detailData?.map((list) => {
          return (
            <video
              controls
              muted
              poster={`${host}/static/${list}.png`}
              width="100%"
              height="60%"
            >
              <source src={`${host}/static/${list}.mp4`} type="audio/mp4" />
            </video>
          );
        })}
      </Modal>
      <Drawer_private setVisible={setVisible} visible={visible} />
    </>
  );
};

export default Private;
