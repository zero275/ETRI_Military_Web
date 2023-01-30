import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Row,
  Col,
  Card,
  Modal,
  Button,
  DatePicker,
  Descriptions,
} from "antd";
import moment from "moment";
import BarChart from "../charts/BarChart";
import Drawer_private from "../../../../components/Drawer_private";
import { UnorderedListOutlined, UserOutlined } from "@ant-design/icons";
const Private = ({ staminaList, rank, auth, _getStamina, date, setDate }) => {
  const [detailData, setDetailData] = useState([]);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visible, setVisible] = useState(false);
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
      <Card className="divide_bg">
        <Row gutter={[16, 16]}>
          <Col span={24} className="divide_top_wr">
            <div className="margin-1em">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>STRONG</Breadcrumb.Item>
                <Breadcrumb.Item>체력관리</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {/* 체력 지수 및 나의 순위 */}
            <span className="font-m weight-s">
              <UnorderedListOutlined
                style={{
                  fontSize: "1.5em",
                  fontWeight: "bold",
                }}
              />{" "}
              종합 체력 지수
            </span>
            <div style={{ margin: "1em 0em" }} className="card-m-container">
              <div className="card-m">
                <span className="font-l weight-l">{rank.pf_index}</span>
                <span className="font-xs weight-xs margin-b-1em">체력지수</span>
              </div>

              <div className="card-m">
                <span className="font-l weight-l">{rank.pf_grade}</span>
                <span className="font-xs weight-xs margin-b-1em">등급</span>
              </div>

              <div className="card-m">
                <span className="font-l weight-l">{rank.rank_platoon}</span>
                <span className="font-xs weight-xs margin-b-1em">
                  소내대 나의 순위
                </span>
              </div>

              <div className="card-m">
                <span className="font-l weight-l">{rank.rank_company}</span>
                <span className="font-xs weight-xs margin-b-1em">
                  중대내 나의 순위
                </span>
              </div>
              <div className="card-m">
                <span className="font-l weight-l">{rank.rank_all}</span>
                <span className="font-xs weight-xs margin-b-1em">
                  전체 나의 순위
                </span>
              </div>
            </div>

            {/* 운동 별 통계 */}
            <div>
              <span className="font-m weight-s">
                <UnorderedListOutlined
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "bold",
                  }}
                />{" "}
                체력 지수(기간)
              </span>
              <div
                style={{
                  width: "30%",
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  margin: "1em 0em",
                }}
              >
                <DatePicker
                  style={{ flex: "8", marginRight: "1em" }}
                  format={"YYYY-MM-DD"}
                  placeholder="기간 조회"
                  onChange={(date, dateString) => {
                    setDate(dateString);
                  }}
                />
                <Button
                  style={{ flex: "2" }}
                  onClick={() => _getStamina(auth.employee_number, date)}
                >
                  조회
                </Button>
              </div>
              <table className="table_st">
                <thead className="table_header">
                  <tr>
                    <th style={{ fontSize: "1.2em" }} colSpan={2}>
                      종목
                    </th>
                    <th style={{ fontSize: "1.2em", minWidth: "5em" }}>
                      체력 지수
                    </th>
                    <th style={{ fontSize: "1.2em" }}>
                      기간 {staminaList?.datebegin} ~ {staminaList?.dateend}
                    </th>
                    <th style={{ fontSize: "1.2em" }}>통계</th>
                  </tr>
                </thead>
                <tbody>
                  {staminaList?.exercise_data ? (
                    Object.keys(staminaList.exercise_data).map((data, idx) => {
                      console.log(data);
                      staminaList?.exercise_data[data].map((list) => {
                        return <></>;
                      });
                      return (
                        <>
                          <tr>
                            <td style={{ fontWeight: "bold" }}>
                              {staminaList?.exercise_data[data][0]?.name ===
                                `푸쉬업` ||
                              staminaList?.exercise_data[data][0]?.name ===
                                `윗몸일으키기`
                                ? `근지구력`
                                : staminaList?.exercise_data[data][0]?.name ===
                                    "턱걸이" ||
                                  staminaList?.exercise_data[data][0]?.name ===
                                    "스쿼트" ||
                                  staminaList?.exercise_data[data][0]?.name ===
                                    "바벨스쿼트" ||
                                  staminaList?.exercise_data[data][0]?.name ===
                                    "데드리프트" ||
                                  staminaList?.exercise_data[data][0]?.name ===
                                    "벤치프레스" ||
                                  staminaList?.exercise_data[data][0]?.name ===
                                    "펙덱플라이" ||
                                  staminaList?.exercise_data[data][0]?.name ===
                                    "크로스오버" ||
                                  staminaList?.exercise_data[data][0]?.name ===
                                    "딥스" ||
                                  staminaList?.exercise_data[data][0]?.name ===
                                    "사이클"
                                ? `근력`
                                : staminaList?.exercise_data[data][0]?.name ===
                                  `3km달리기`
                                ? `심폐지구력`
                                : null}
                            </td>

                            <td className="table_img_wrap">
                              <img
                                src={`./images/fitness/${data}.png`}
                                alt={data}
                                style={{
                                  objectFit: "scale-down",
                                  width: "10em",
                                  height: "10em",
                                  minWidth: "5em",
                                  minHeight: "5em",
                                }}
                              />
                              <div>
                                {staminaList?.exercise_data[data][0].name}
                              </div>
                            </td>
                            <td>{staminaList?.exercise_data[data][0].grade}</td>
                            <td>
                              {/* <BarChart
                                arr={staminaList?.exercise_data[data]}
                              /> */}
                            </td>
                            <td>
                              <Button
                                onClick={() => {
                                  setVisibleDetail(true);
                                  setDetailData(
                                    staminaList?.exercise_data[data]
                                  );
                                }}
                              >
                                상세보기
                              </Button>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <>
                      <tr>
                        <td colSpan={5}>데이터가 존재하지 않습니다.</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </Col>
        </Row>

        <Modal
          title={`나의 ${detailData?.name} 상세보기`}
          visible={visibleDetail}
          width={500}
          closable={true}
          okText="닫기"
          onOk={() => setVisibleDetail(false)}
          onCancel={() => setVisibleDetail(false)}
          cancelButtonProps={{ style: { display: "none" } }}
        >
          <Descriptions bordered>
            <Descriptions.Item label="최대 개수" span={3}>
              {detailData?.max}
            </Descriptions.Item>
            <Descriptions.Item label="최소 개수" span={3}>
              {detailData?.min}
            </Descriptions.Item>
            <Descriptions.Item label="평균 개수" span={3}>
              {detailData?.avg?.toFixed(1)}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      </Card>

      <Drawer_private setVisible={setVisible} visible={visible} />
    </>
  );
};

export default Private;
