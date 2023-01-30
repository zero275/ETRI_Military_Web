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
import {
  TeamOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import BarChart_week from "../charts/BarChart_week";
import BarChart_month from "../charts/BarChart_month";
import BarChart_lastest from "../charts/BarChart_lastest";
import * as config from "../../../../config";
import Drawer_commander from "../../../../components/Drawer_commander";
import SearchSolidierBar from "../../../../components/searchSolidierBar";
import InfoPage from "../../../../components/InfoPage";
import { useStoreName } from "../../../../store/namesStore";
import SoldierInfo from "../../../../components/soldierInfo";
import moment from "moment";
const host = config.LOCAL_DEV_URL;
const Commander = ({
  auth,
  adaptability,
  recentAdaptability,
  _getAdaptabilityResult,
  setDate,
  date,
}) => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("주");
  const [detailData, setDetailData] = useState([]);
  const [visibleDetail, setVisibleDetail] = useState(false);
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
                <Breadcrumb.Item>복무적응도</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            {/* 나의 최신 */}
            {id ? (
              <>
                <SoldierInfo id={id} />
                <div>
                  <span className="font-m weight-s">
                    <UnorderedListOutlined
                      style={{
                        fontSize: "1.5em",
                        fontWeight: "bold",
                      }}
                    />
                    복무적응도 결과
                  </span>
                  <Tooltip
                    placement="topLeft"
                    title={recentAdaptability?.datelatest}
                    color="green"
                  >
                    <span
                      style={{ color: "green", cursor: "pointer" }}
                      className="font-m weight-s"
                    >
                      (가장 최근 데이터)
                    </span>
                  </Tooltip>
                  <div
                    style={{ margin: "1em 0em" }}
                    className="card-m-container"
                  >
                    {recentAdaptability?.data.length ? (
                      <>
                        {recentAdaptability?.data.map((list) => {
                          return (
                            <div className="card-m">
                              <span className="font-l weight-l">
                                {list?.score}/5
                              </span>

                              <span className="font-xs weight-xs margin-b-1em">
                                {list?.name}
                              </span>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div
                    style={{ textAlign: "center", margin: "auto" }}
                    className="flex-first-row"
                  >
                    <BarChart_lastest
                      adaptablility={recentAdaptability?.msabscore}
                    />
                  </div>
                </div>

                {/* 기간 별 */}

                <div style={{ marginTop: "1.5em" }}>
                  <span className="font-m weight-s">
                    <UnorderedListOutlined
                      style={{
                        fontSize: "1.5em",
                        fontWeight: "bold",
                      }}
                    />
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
                      value={date && moment(date)}
                      format={"YYYY-MM-DD"}
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
                      onClick={() => _getAdaptabilityResult(id, date, type)}
                    >
                      조회
                    </Button>
                  </div>
                  <table className="table_st">
                    <thead className="table_header">
                      <tr>
                        <th style={{ fontSize: "1.2em" }}>분류</th>
                        <th style={{ fontSize: "1.2em" }}>
                          기간 {adaptability?.datebegin} ~{" "}
                          {adaptability?.dateend}
                        </th>
                        <th style={{ fontSize: "1.2em" }}>통계</th>
                      </tr>
                    </thead>
                    <tbody>
                      {adaptability?.list?.length ? (
                        <>
                          {adaptability?.list.map((list) => {
                            return (
                              <tr>
                                <td>{list.name}</td>
                                <td>
                                  {adaptability?.weekormonth === "주" ? (
                                    <BarChart_week arr={list?.data} />
                                  ) : (
                                    <BarChart_month arr={list?.data} />
                                  )}
                                </td>
                                <td>
                                  <Button
                                    onClick={() => {
                                      setVisibleDetail(true);
                                      adaptability?.stat?.map((data) => {
                                        if (data.name === list.name)
                                          setDetailData(data);
                                      });
                                    }}
                                  >
                                    상세보기
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </>
                      ) : (
                        <tr>
                          <td colSpan={3}>데이터가 없습니다.</td>
                        </tr>
                      )}

                      {/* <tr>
                        <td>생활/업무만족</td>
                        <td>
                          {adaptability?.weekormonth === "주" ? (
                            <>
                              {adaptability?.list?.map((data) => {
                                if (data.name === "생활/업무만족")
                                  return <BarChart_week arr={data?.data} />;
                                return null;
                              })}
                            </>
                          ) : (
                            <>
                              {adaptability?.list?.map((data) => {
                                if (data.name === "생활/업무만족")
                                  return <BarChart_month arr={data?.data} />;
                                return null;
                              })}
                            </>
                          )}
                        </td>
                        <td>
                          <Button
                            onClick={() => {
                              setVisibleDetail(true);
                              adaptability?.stat?.map((data) => {
                                if (data.name === "생활/업무만족")
                                  setDetailData(data);
                              });
                            }}
                          >
                            상세보기
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>대인관계</td>
                        <td>
                          {adaptability?.weekormonth === "주" ? (
                            <>
                              {adaptability?.list?.map((data) => {
                                if (data.name === "대인관계")
                                  return <BarChart_week arr={data?.data} />;
                                return null;
                              })}
                            </>
                          ) : (
                            <>
                              {adaptability?.list?.map((data) => {
                                if (data.name === "대인관계")
                                  return <BarChart_month arr={data?.data} />;
                                return null;
                              })}
                            </>
                          )}
                        </td>
                        <td>
                          <Button
                            onClick={() => {
                              setVisibleDetail(true);
                              adaptability?.stat?.map((data) => {
                                if (data.name === "대인관계")
                                  setDetailData(data);
                              });
                            }}
                          >
                            상세보기
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>이성</td>
                        <td>
                          {adaptability?.weekormonth === "주" ? (
                            <>
                              {adaptability?.list?.map((data) => {
                                if (data.name === "이성")
                                  return <BarChart_week arr={data?.data} />;
                                return null;
                              })}
                            </>
                          ) : (
                            <>
                              {adaptability?.list?.map((data) => {
                                if (data.name === "이성")
                                  return <BarChart_month arr={data?.data} />;
                                return null;
                              })}
                            </>
                          )}
                        </td>
                        <td>
                          <Button
                            onClick={() => {
                              setVisibleDetail(true);
                              adaptability?.stat?.map((data) => {
                                if (data.name === "이성") setDetailData(data);
                              });
                            }}
                          >
                            상세보기
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>경제</td>
                        <td>
                          {adaptability?.weekormonth === "주" ? (
                            <>
                              {adaptability?.list?.map((data) => {
                                if (data.name === "경제")
                                  return <BarChart_week arr={data?.data} />;
                                return null;
                              })}
                            </>
                          ) : (
                            <>
                              {adaptability?.list?.map((data) => {
                                if (data.name === "경제")
                                  return <BarChart_month arr={data?.data} />;
                                return null;
                              })}
                            </>
                          )}
                        </td>
                        <td>
                          <Button
                            onClick={() => {
                              setVisibleDetail(true);
                              adaptability?.stat?.map((data) => {
                                if (data.name === "이성") setDetailData(data);
                              });
                            }}
                          >
                            상세보기
                          </Button>
                        </td>
                      </tr> */}
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
      <Drawer_commander setVisible={setVisible} visible={visible} />
    </>
  );
};

export default Commander;
