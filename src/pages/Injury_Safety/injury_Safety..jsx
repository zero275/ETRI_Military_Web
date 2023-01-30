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
const Injury_Safety = () => {
  const auth = useStoreAuth((state) => state.auth);
  const [injuryResult, setInjuryResult] = useState({});
  const [recentInjuryResult, setRecentInjuryResult] = useState({});
  const id = useStoreName((state) => state.id);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    if (auth?.grade_t === "병사") {
      _getInjuryResult(
        auth.employee_number,
        moment().format("YYYY-MM-DD"),
        "주"
      );
      _getRecentInjuryResult(auth.employee_number);
    } else if (
      (auth?.grade_t === "지휘관" || auth?.grade_t === "관리자") &&
      id
    ) {
      _getInjuryResult(id, moment().format("YYYY-MM-DD"), "주");
      _getRecentInjuryResult(id);
    }
  }, [auth, id]);

  const _getInjuryResult = async (id, date, type) => {
    let inputDate = date || moment().format("YYYY-MM-DD");
    let inputType = type || "주";
    await axios
      .get(
        `/api/bipb/get-weekormonth?userid=${id}&date=${inputDate}&weekormonth=${inputType}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data, "5. 부상안전도 - 주,월 데이터");
          setInjuryResult(res.data);
        } else if (res.status !== 200) {
          alert("서버 오류. 관리자에게 문의바랍니다.");
        }
      })
      .catch((err) => {
        alert("서버 오류. 관리자에게 문의바랍니다.");
        console.error(err);
      });
  };

  const _getRecentInjuryResult = async (id) => {
    await axios
      .get(`/api/bipb/get-latest?userid=${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data, "5. 부상안전도 - 최신 데이터");
          setRecentInjuryResult(res.data);
          setDate(res.data.datelatest);

          if (auth?.grade_t === "병사") {
            _getInjuryResult(auth.employee_number, res.data.datelatest, "주");
          } else {
            _getInjuryResult(id, res.data.datelatest, "주");
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
          injuryResult={injuryResult}
          _getInjuryResult={_getInjuryResult}
          recentInjuryResult={recentInjuryResult}
          setDate={setDate}
          date={date}
        />
      ) : auth?.grade_t === "지휘관" || auth?.grade_t === "관리자" ? (
        <Commander
          auth={auth}
          injuryResult={injuryResult}
          _getInjuryResult={_getInjuryResult}
          recentInjuryResult={recentInjuryResult}
          setDate={setDate}
          date={date}
        />
      ) : null}
    </>
  );
};

export default Injury_Safety;
