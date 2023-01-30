import React, { useEffect, useState } from "react";
import axios from "axios";
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
} from "antd";
import { useStoreAuth } from "../../store/authStore";
import Private from "./components/Private/private";
import moment from "moment";
import Commander from "./components/Commander/commander";
import { useStoreName } from "../../store/namesStore";

const Behavioral_Management = () => {
  const id = useStoreName((state) => state.id);
  const auth = useStoreAuth((state) => state.auth);
  const [behavioralResult, setBehavioralResult] = useState({});
  const [recentBehavioralResult, setRecentBehavioralResult] = useState({});
  const [date, setDate] = useState("");

  useEffect(() => {
    if (auth?.grade_t === "병사") {
      _getBehavioralResult(
        auth.employee_number,
        moment().format("YYYY-MM-DD"),
        "주"
      );
      _getRecentBehavioralResult(auth.employee_number);
    } else if (
      (auth?.grade_t === "지휘관" || auth?.grade_t === "관리자") &&
      id
    ) {
      _getBehavioralResult(id, moment().format("YYYY-MM-DD"), "주");
      _getRecentBehavioralResult(id);
    }
  }, [auth, id]);

  const _getBehavioralResult = async (id, date, type) => {
    let inputDate = date || moment().format("YYYY-MM-DD");
    let inputType = type || "주";
    await axios
      .get(
        `/api/bpcb/get-weekormonth?userid=${id}&date=${inputDate}&weekormonth=${inputType}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data, "4. 행동심리 - 주,월 데이터");
          setBehavioralResult(res.data);
        } else if (res.status !== 200) {
          alert("서버 오류. 관리자에게 문의바랍니다.");
        }
      })
      .catch((err) => {
        alert("서버 오류. 관리자에게 문의바랍니다.");
        console.error(err);
      });
  };

  const _getRecentBehavioralResult = async (id) => {
    await axios
      .get(`/api/bpcb/get-latest?userid=${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data, "4. 행동심리 - 최신 데이터");
          setRecentBehavioralResult(res.data);
          setDate(res.data.datelatest);

          if (auth?.grade_t === "병사") {
            _getBehavioralResult(
              auth.employee_number,
              res.data.datelatest,
              "주"
            );
          } else {
            _getBehavioralResult(id, res.data.datelatest, "주");
          }
        } else if (res.status !== 200) {
          alert("서버 오류. 관리자에게 문의바랍니다.");
        }
      })
      .catch((err) => {
        alert("서버 오류. 관리자에게 문의바랍니다.");
        console.error(err);
      });
  };

  return (
    <>
      {auth?.grade_t === "병사" ? (
        <Private
          auth={auth}
          behavioralResult={behavioralResult}
          recentBehavioralResult={recentBehavioralResult}
          _getBehavioralResult={_getBehavioralResult}
          date={date}
          setDate={setDate}
        />
      ) : auth?.grade_t === "지휘관" || auth?.grade_t === "관리자" ? (
        <Commander
          auth={auth}
          behavioralResult={behavioralResult}
          recentBehavioralResult={recentBehavioralResult}
          _getBehavioralResult={_getBehavioralResult}
          date={date}
          setDate={setDate}
        />
      ) : null}
    </>
  );
};

export default Behavioral_Management;
