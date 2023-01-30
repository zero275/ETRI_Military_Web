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
} from "antd";
import Drawer_private from "../../../../components/Drawer_private";
import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
import BarChart_month from "../charts/BarChart_month";
import BarChart_week from "../charts/BarChart_week";
// import Map from "../Maps/Map";
// import ArcGIS from "../Maps/ArcGIS";
import OfflineMap from "../Maps/OfflineMap";
import Drawer_commander from "../../../../components/Drawer_commander";
import SearchSolidierBar from "../../../../components/searchSolidierBar";
import InfoPage from "../../../../components/InfoPage";
import SoldierInfo from "../../../../components/soldierInfo";
import { useStoreName } from "../../../../store/namesStore";
import moment from "moment";
const Commander = ({
  auth,
  dailyActivityTotal,
  dailyActivityTrand,
  _getDailyActivityTrand,
  _getDailyActivityTotal,
  date,
  dateRoute,
  setDate,
  setDateRoute,
}) => {
  const [visible, setVisible] = useState(false);
  // const [date, setDate] = useState("");
  // const [dateRoute, setDateRoute] = useState("");
  const [type, setType] = useState("주");
  const id = useStoreName((state) => state.id);
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

      <SearchSolidierBar />

      <Card className="divide_bg">
        <Row gutter={[16, 16]}>
          <Col span={24} className="divide_top_wr">
            <div className="margin-1em">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>STRONG</Breadcrumb.Item>
                <Breadcrumb.Item>데일리활동량</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            {id ? (
              <>
                <SoldierInfo id={id} />

                <div style={{ marginTop: "1.5em" }}>
                  <span className="font-m weight-s">
                    <UnorderedListOutlined
                      style={{
                        fontSize: "1.5em",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    데일리 이동경로 (기간)
                  </span>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "end",
                      alignItems: "center",
                      marginBottom: "1em",
                      marginTop: "1em",
                    }}
                  >
                    <DatePicker
                      style={{
                        flex: "8",
                        marginRight: "1em",
                      }}
                      format={"YYYY-MM-DD"}
                      placeholder="기간 선택"
                      value={dateRoute && moment(dateRoute)}
                      onChange={(date, dateString) => {
                        setDateRoute(dateString);
                      }}
                    />
                    <Button
                      style={{ flex: "1" }}
                      onClick={() => _getDailyActivityTotal(id, dateRoute)}
                    >
                      조회
                    </Button>
                  </div>

                  {/* <Map data={dailyActivityTotal.data} /> */}
                  {/* <ArcGIS data={dailyActivityTotal.data} /> */}
                  <OfflineMap data={dailyActivityTotal.data} />
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
                    데일리 활동량
                  </span>
                  <div
                    style={{ margin: "1em 0em" }}
                    className="card-m-container"
                  >
                    <div className="card-m">
                      <span className="font-l weight-l">
                        {dailyActivityTotal.distance?.substr(0, 7)}
                      </span>
                      <span className="font-xs weight-xs margin-b-1em">
                        총 이동거리 (km)
                      </span>
                    </div>

                    <div className="card-m">
                      <span className="font-l weight-l">
                        {dailyActivityTotal.calorie?.substr(0, 7)}
                      </span>
                      <span className="font-xs weight-xs margin-b-1em">
                        칼로리
                      </span>
                    </div>

                    <div className="card-m">
                      <span className="font-l weight-l">
                        {dailyActivityTotal.actlevel == 0
                          ? "아주 적은 활동량"
                          : dailyActivityTotal.actlevel == 1
                          ? "적은 활동량"
                          : dailyActivityTotal.actlevel == 2
                          ? " 평균적인 활동량"
                          : dailyActivityTotal.actlevel == 3
                          ? "많은 활동량"
                          : dailyActivityTotal.actlevel == 4
                          ? "아주 많은 활동량"
                          : null}
                      </span>
                      <span className="font-xs weight-xs margin-b-1em">
                        활동량 지표
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "1.5em" }}>
                  <span className="font-m weight-s">
                    <UnorderedListOutlined
                      style={{
                        fontSize: "1.5em",
                        fontWeight: "bold",
                      }}
                    />{" "}
                    데일리 활동량 트랜드 (기간)
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
                      onClick={() => _getDailyActivityTrand(id, date, type)}
                    >
                      조회
                    </Button>
                  </div>
                  <table className="table_st">
                    <thead className="table_header">
                      <tr>
                        <th style={{ fontSize: "1.2em" }}>분류</th>
                        <th style={{ fontSize: "1.2em" }}>
                          기간 {dailyActivityTrand?.datebegin} ~{" "}
                          {dailyActivityTrand?.dateend}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>총 이동거리(km)</td>
                        <td>
                          {dailyActivityTrand.weekormonth === "주" ? (
                            <>
                              {dailyActivityTrand?.distancelist && (
                                <BarChart_week
                                  arr={dailyActivityTrand?.distancelist}
                                />
                              )}
                            </>
                          ) : (
                            <>
                              {dailyActivityTrand?.distancelist && (
                                <BarChart_month
                                  arr={dailyActivityTrand?.distancelist}
                                />
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>칼로리</td>
                        <td>
                          {dailyActivityTrand.weekormonth === "주" ? (
                            <>
                              {dailyActivityTrand?.calorielist && (
                                <BarChart_week
                                  arr={dailyActivityTrand?.calorielist}
                                />
                              )}
                            </>
                          ) : (
                            <>
                              {dailyActivityTrand?.calorielist && (
                                <BarChart_month
                                  arr={dailyActivityTrand?.calorielist}
                                />
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>활동량 지표</td>
                        <td>
                          {dailyActivityTrand.weekormonth === "주" ? (
                            <>
                              {dailyActivityTrand?.actlevellist && (
                                <BarChart_week
                                  arr={dailyActivityTrand?.actlevellist}
                                />
                              )}
                            </>
                          ) : (
                            <>
                              {dailyActivityTrand?.actlevellist && (
                                <BarChart_month
                                  arr={dailyActivityTrand?.actlevellist}
                                />
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <InfoPage />
            )}
          </Col>
        </Row>
      </Card>
      <Drawer_commander setVisible={setVisible} visible={visible} />
    </>
  );
};

export default Commander;
