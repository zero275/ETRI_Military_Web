import { SmileOutlined, UnorderedListOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import * as config from "./../config";
const host = config.LOCAL_DEV_URL;
const SoldierInfo = ({ id, data }) => {
  const [soldierInfo, setSoldierInfo] = useState({});
  useEffect(() => {
    _getSoldierInfo(id);
  }, [id]);

  const _getSoldierInfo = async (id) => {
    await axios
      .get(`/api/soldier-info?userid=${id}`) //
      .then((res) => {
        if (res?.status === 200) {
          if (res.data.result === "N") {
            alert("오류. 관리자에게 문의 바랍니다.");
          } else if (res.data.result === "Y") {
            setSoldierInfo(res.data);
          }
        } else if (res.status !== 200) {
          alert("오류. 관리자에게 문의 바랍니다.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="card_wrap_s">
      <span
        style={{
          textAlign: "center",
          fontSize: "1.5em",
          fontWeight: "bold",
        }}
      >
        <UnorderedListOutlined
          style={{
            fontSize: "1.5em",
            fontWeight: "bold",
          }}
        />{" "}
        병사 기본 정보
      </span>
      <div style={{ marginTop: "1em" }} className="solider_info_container_l">
        <div style={{ margin: "1em 3em" }}>
          <img
            // src="/images/200001.png"
            src={`${host}/static/photo/${id}.png`}
            className="avatar_image_m"
            alt="병사사진"
            onError={(e) => {
              e.target.src = "images/picture/user.png";
            }}
          />
        </div>
        <div className="solider_info_wrap_l">
          <div className="solider_info">
            <span className="soldier_info_key font-m">이름:</span>
            <span
              style={{ color: "#1890ff" }}
              className="soldier_info_value font-m"
            >
              {soldierInfo?.person_name}
            </span>
          </div>
          <div className="solider_info">
            <span className="soldier_info_key font-m">계급:</span>
            <span className="soldier_info_value font-m">
              {soldierInfo?.grade_name}
            </span>
          </div>
          <div className="solider_info">
            <span className="soldier_info_key font-m">신장:</span>
            <span className="soldier_info_value font-m">
              {soldierInfo?.height}cm
            </span>
          </div>
          <div className="solider_info">
            <span className="soldier_info_key font-m">몸무게:</span>
            <span className="soldier_info_value font-m">
              {soldierInfo?.weight}kg
            </span>
          </div>
          <div className="solider_info">
            <span className="soldier_info_key font-m">나이:</span>
            <span className="soldier_info_value font-m">
              {soldierInfo?.age}세
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoldierInfo;
