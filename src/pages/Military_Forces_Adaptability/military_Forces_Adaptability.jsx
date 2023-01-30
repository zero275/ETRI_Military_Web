import React, { useState } from "react";
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
import axios from "axios";
import { useEffect } from "react";
import { useStoreName } from "../../store/namesStore";
import Commander from "./components/Commander/commander";
const Military_Forces_Adaptability = () => {
  const auth = useStoreAuth((state) => state.auth);
  const id = useStoreName((state) => state.id);
  const [adaptability, setAdaptability] = useState();
  const [recentAdaptability, setRecentAdaptability] = useState();
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    if (auth?.grade_t === "병사") {
      _getRecentAdaptabilityResult(auth.employee_number);
      _getAdaptabilityResult(
        auth.employee_number,
        moment().format("YYYY-MM-DD"),
        "주"
      );
    } else if (
      (auth?.grade_t === "지휘관" || auth?.grade_t === "관리자") &&
      id
    ) {
      _getRecentAdaptabilityResult(id);
      _getAdaptabilityResult(id, moment().format("YYYY-MM-DD"), "주");
    }
  }, [auth, id]);

  const _getRecentAdaptabilityResult = async (id) => {
    await axios
      .get(`/api/msab/get-latest?userid=${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data, "6. 복무적응도 - 최신데이터");
          setRecentAdaptability(res.data);
          setDate(res.data.datelatest);
          if (auth?.grade_t === "병사") {
            _getAdaptabilityResult(
              auth.employee_number,
              res.data.datelatest,
              "주"
            );
          } else {
            _getAdaptabilityResult(id, res.data.datelatest, "주");
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

  const _getAdaptabilityResult = async (id, date, type) => {
    let inputDate = date || moment().format("YYYY-MM-DD");
    let inputType = type || "주";
    await axios
      .get(
        `/api/msab/get-weekormonth?userid=${id}&date=${inputDate}&weekormonth=${inputType}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data, "6. 복무적응도 - 주,월 데이터");
          setAdaptability(res.data);
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
      {auth?.grade_t === "병사" ? //   adaptability={adaptability} //   auth={auth} // <Private
      //   recentAdaptability={recentAdaptability}
      //   _getAdaptabilityResult={_getAdaptabilityResult}
      //   setDate={setDate}
      //   date={date}
      // />
      null : auth?.grade_t === "지휘관" || auth?.grade_t === "관리자" ? (
        <>
          <Commander
            auth={auth}
            adaptability={adaptability}
            recentAdaptability={recentAdaptability}
            _getAdaptabilityResult={_getAdaptabilityResult}
            setDate={setDate}
            date={date}
          />
        </>
      ) : null}
    </>
  );
};

export default Military_Forces_Adaptability;
