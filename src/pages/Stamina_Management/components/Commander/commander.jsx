import {
  SearchOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
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
import { Progress } from "antd";
import moment from "moment";
import React, { useState } from "react";
import Drawer_commander from "../../../../components/Drawer_commander";
import InfoPage from "../../../../components/InfoPage";
import SearchSolidierBar from "../../../../components/searchSolidierBar";
import SoldierInfo from "../../../../components/soldierInfo";
import { useStoreName } from "../../../../store/namesStore";
import BarChart from "../charts/BarChart";

const Commander = ({ staminaList, rank, auth, _getStamina, date, setDate }) => {
  const id = useStoreName((state) => state.id);
  const [detailData, setDetailData] = useState([]);
  const [visibleDetail, setVisibleDetail] = useState(false);
  const [visible, setVisible] = useState(false);

  function typeofExercise(exercise) {
    if (exercise === "사이클") {
      return "거리";
    } else if (exercise === "3km달리기") {
      return "시간";
    } else {
      return "개수";
    }
  }
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
                <Breadcrumb.Item>체력관리</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            {id ? (
              <>
                <SoldierInfo id={id} />
                {/* 체력 지수 및 나의 순위 */}
                <span className="font-m weight-s">
                  <UnorderedListOutlined
                    style={{
                      fontSize: "1.5em",
                      fontWeight: "bold",
                    }}
                  />{" "}
                  체력 지수
                </span>
                <div style={{ margin: "1em 0em" }} className="card-m-container">
                  <div className="card-m">
                    <span className="font-l weight-l">{rank.pf_index}</span>
                    <span className="font-xs weight-xs margin-b-1em">
                      체력지수
                    </span>
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
                    종합 체력 지수(기간)
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
                      value={date && moment(date)}
                      placeholder="기간 조회"
                      onChange={(date, dateString) => {
                        setDate(dateString);
                      }}
                    />
                    <Button
                      style={{ flex: "2" }}
                      onClick={() => _getStamina(id, date)}
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
                        Object.keys(staminaList.exercise_data).map(
                          (data, idx) => {
                            return staminaList?.exercise_data[data].map(
                              (list) => {
                                return (
                                  <>
                                    <tr>
                                      <td style={{ fontWeight: "bold" }}>
                                        {list.name === `푸쉬업` ||
                                        list.name === `윗몸일으키기`
                                          ? `근지구력`
                                          : list.name === "턱걸이" ||
                                            list.name === "스쿼트" ||
                                            list.name === "바벨스쿼트" ||
                                            list.name === "데드리프트" ||
                                            list.name === "벤치프레스" ||
                                            list.name === "펙덱플라이" ||
                                            list.name === "크로스오버" ||
                                            list.name === "딥스" ||
                                            list.name === "사이클"
                                          ? `근력`
                                          : list.name === `3km달리기`
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
                                          {list.name} {list.param1}
                                          {list.param1_unit}
                                        </div>
                                      </td>
                                      <td>{list.grade}</td>
                                      <td>
                                        <BarChart arr={list.data} />
                                      </td>
                                      <td>
                                        <Button
                                          onClick={() => {
                                            setVisibleDetail(true);
                                            setDetailData(list);
                                          }}
                                        >
                                          상세보기
                                        </Button>
                                      </td>
                                    </tr>
                                  </>
                                );
                              }
                            );
                          }
                        )
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
              </>
            ) : (
              <InfoPage />
            )}
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
            <Descriptions.Item
              label={`최대 ${typeofExercise(detailData?.name)}`}
              span={3}
            >
              {detailData?.max}
            </Descriptions.Item>
            <Descriptions.Item
              label={`최소 ${typeofExercise(detailData?.name)}`}
              span={3}
            >
              {detailData?.min}
            </Descriptions.Item>
            <Descriptions.Item
              label={`평균 ${typeofExercise(detailData?.name)}`}
              span={3}
            >
              {detailData?.avg?.toFixed(1)}
            </Descriptions.Item>
          </Descriptions>
        </Modal>
      </Card>
      <Drawer_commander setVisible={setVisible} visible={visible} />
    </>
  );
};

export default Commander;
