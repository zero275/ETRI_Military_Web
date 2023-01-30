import {
  LeftOutlined,
  RightOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Card, Col, Input, Row, Select } from "antd";
import { Progress } from "antd";
import React, { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Drawer_commander from "../../../../components/Drawer_commander";
import SearchSolidierBar from "../../../../components/searchSolidierBar";
import SliderButton from "../../../../components/sliderButton";
import { useStoreName } from "../../../../store/namesStore";
import LineChart from "../charts/LineChart";
import * as config from "./../../../../config";

const host = config.LOCAL_DEV_URL;
const Commander = ({ auth, totalList }) => {
  const [visible, setVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const container = useRef(0);
  const wrap = useRef(0);

  useEffect(() => {
    container.current.style.transition = "all 0.2s ease-out";
    container.current.style.transform = `translateX(-${currentSlide}px)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
  }, [currentSlide]);

  const nextSlide = () => {
    let wrapWitdh = wrap.current.clientWidth + 13;
    let containerWidth = container.current.clientWidth - wrapWitdh * 3;
    if (currentSlide >= containerWidth) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + wrapWitdh);
    }
  };
  const prevSlide = () => {
    let wrapWitdh = wrap.current.clientWidth + 13;
    if (currentSlide <= 0) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide - wrapWitdh);
    }
  };

  return (
    <>
      <SliderButton setVisible={setVisible} auth={auth} />
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
      <Card className="divide_bg">
        <Row gutter={[16, 16]}>
          <Col span={24} className="divide_top_wr scroll_x">
            <div className="margin-1em">
              <Breadcrumb separator=">">
                <Breadcrumb.Item>STRONG</Breadcrumb.Item>
                <Breadcrumb.Item>종합지수</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <span className="font-m weight-s">
              <UnorderedListOutlined
                style={{
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  marginBottom: "1em",
                }}
              />
              나의 소대원 정보
            </span>

            <Button
              style={{
                padding: "1em",
                width: "5em",
                height: "5em",
                borderRadius: "50%",
                position: "fixed",
                top: "90%",
                left: "330px",
                zIndex: "10",
              }}
              onClick={prevSlide}
            >
              <LeftOutlined style={{ fontSize: "1.5em" }} />
            </Button>
            <Button
              style={{
                padding: "1em",
                width: "5em",
                height: "5em",
                borderRadius: "50%",
                position: "fixed",
                top: "90%",
                right: "30px",
                zIndex: "10",
              }}
              onClick={nextSlide}
            >
              <RightOutlined style={{ fontSize: "1.5em" }} />
            </Button>

            <div className="card_container" ref={container}>
              {totalList?.data?.map((list) => {
                return (
                  <div className="card_wrap" ref={wrap}>
                    <span
                      style={{
                        textAlign: "center",
                        fontSize: "1.5em",
                        fontWeight: "bold",
                        borderBottom: "1px solid lightgray",
                      }}
                    >
                      병사 기본 정보
                    </span>
                    <div
                      style={{ marginTop: "1em" }}
                      className="solider_info_container"
                    >
                      <div>
                        <img
                          src={`${host}/static/photo/${list?.employee_number}.png`}
                          // src="/images/200001.png"
                          onError={(e) => {
                            e.target.src = "images/picture/user.png";
                          }}
                          className="avatar_image_s"
                          alt="병사사진"
                        />
                      </div>
                      <div className="solider_info_wrap">
                        <div className="solider_info">
                          <span className="soldier_info_key">이름:</span>
                          <span
                            style={{ color: "#1890ff" }}
                            className="soldier_info_value"
                          >
                            {list.person_name}
                          </span>
                        </div>
                        <div className="solider_info">
                          <span className="soldier_info_key">계급:</span>
                          <span className="soldier_info_value">
                            {list.grade_name}
                          </span>
                        </div>
                        <div className="solider_info">
                          <span className="soldier_info_key">신장:</span>
                          <span className="soldier_info_value">
                            {list.height}cm
                          </span>
                        </div>
                        <div className="solider_info">
                          <span className="soldier_info_key">몸무게:</span>
                          <span className="soldier_info_value">
                            {list.weight}kg
                          </span>
                        </div>
                        <div className="solider_info">
                          <span className="soldier_info_key">나이:</span>
                          <span className="soldier_info_value">
                            {list.age}세
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: "center", marginBottom: "1em" }}>
                      <Progress
                        width={150}
                        strokeLinecap="square"
                        type="circle"
                        strokeColor={{
                          "0%": "#108ee9",
                          "100%": "#108ee9",
                        }}
                        percent={parseInt(list.strong_index)}
                        format={() => (
                          <div className="progressbar_circle_wrap">
                            <div style={{ fontSize: "1em", fontWeight: "500" }}>
                              STRONG지수
                            </div>
                            <div
                              style={{ fontSize: "1.3em", fontWeight: "800" }}
                            >
                              {list.strong_index}
                            </div>
                          </div>
                        )}
                      />
                    </div>

                    <div className="progressbar_container">
                      <div className="progressbar_wrap">
                        <p className="progressbar_text">데일리 활동량</p>
                        <Progress
                          className="progressbar_s"
                          strokeColor={{
                            "0%": "#108ee9",
                            "100%": "#108ee9",
                          }}
                          format={(percent) => {
                            return percent;
                          }}
                          percent={parseInt(list.activity)}
                        />
                      </div>
                      <div className="progressbar_wrap">
                        <p className="progressbar_text">체력 관리</p>
                        <Progress
                          className="progressbar_s"
                          strokeColor={{
                            "0%": "#108ee9",
                            "100%": "#108ee9",
                          }}
                          format={(percent) => {
                            return percent;
                          }}
                          percent={parseInt(list.pt_index)}
                        />
                      </div>
                      <div className="progressbar_wrap">
                        <p className="progressbar_text">스트레스저항도</p>
                        <Progress
                          className="progressbar_s"
                          strokeColor={{
                            "0%": "#108ee9",
                            "100%": "#108ee9",
                          }}
                          format={(percent) => {
                            return percent;
                          }}
                          percent={parseInt(list.behavior)}
                        />
                      </div>
                      <div className="progressbar_wrap">
                        <p className="progressbar_text">신체활력도</p>
                        <Progress
                          className="progressbar_s"
                          strokeColor={{
                            "0%": "#108ee9",
                            "100%": "#108ee9",
                          }}
                          format={(percent) => {
                            return percent;
                          }}
                          percent={parseInt(list.behavior2)}
                        />
                      </div>
                      <div className="progressbar_wrap">
                        <p className="progressbar_text">부상 안전도</p>
                        <Progress
                          className="progressbar_s"
                          strokeColor={{
                            "0%": "#108ee9",
                            "100%": "#108ee9",
                          }}
                          format={(percent) => {
                            return percent;
                          }}
                          percent={parseInt(list.injury_index)}
                        />
                      </div>
                      <div className="progressbar_wrap">
                        <p className="progressbar_text">복무 적응도</p>
                        <Progress
                          className="progressbar_s"
                          strokeColor={{
                            "0%": "#108ee9",
                            "100%": "#108ee9",
                          }}
                          format={(percent) => {
                            return percent;
                          }}
                          percent={parseInt(list.ready_index)}
                        />
                      </div>
                      {/* <div className="progressbar_wrap">
                        <p className="progressbar_text">사고 안전도</p>
                        <Progress
                          className="progressbar_s"
                          strokeColor={{
                            "0%": "#108ee9",
                            "100%": "#108ee9",
                          }}
                          percent={parseInt(list.safe_index)}
                        />
                      </div>
                      <div className="progressbar_wrap">
                        <p className="progressbar_text">인재역량</p>
                        <Progress
                          className="progressbar_s"
                          strokeColor={{
                            "0%": "#108ee9",
                            "100%": "#108ee9",
                          }}
                          percent={parseInt(list.talent_index)}
                        />
                      </div> */}
                    </div>

                    <div
                      style={{
                        width: "100%",
                        height: "13em",
                      }}
                    >
                      <LineChart data={list.strong_index_30} />
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Card>
      <Drawer_commander setVisible={setVisible} visible={visible} />
    </>
  );
};

export default Commander;
