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
} from "antd";
import axios from "axios";
import { useStoreAuth } from "../../store/authStore";
import Private from "./components/Private/private";
import moment from "moment";
import Commander from "./components/Commander/commander";
import { useStoreName } from "../../store/namesStore";
const Daily_Activity = () => {
  const auth = useStoreAuth((state) => state.auth);
  const [dailyActivityTotal, setDailyActivityTotal] = useState("");
  const [dailyActivityTrand, setDailyActivityTrand] = useState("");
  const id = useStoreName((state) => state.id);
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [dateRoute, setDateRoute] = useState(moment().format("YYYY-MM-DD"));

  useEffect(() => {
    if (auth?.grade_t === "병사") {
      _getDailyActivityRecent(auth.employee_number);
      _getDailyActivityTrand(auth.employee_number, date, "주");
      _getDailyActivityTotal(auth.employee_number, dateRoute);
    } else if (
      (auth?.grade_t === "지휘관" || auth?.grade_t === "관리자") &&
      id
    ) {
      _getDailyActivityRecent(id);
      _getDailyActivityTrand(id, date, "주");
      _getDailyActivityTotal(id, dateRoute);
    }
  }, [auth, id]);

  const _getDailyActivityRecent = async (id, dateString) => {
    console.log(dateString);
    axios
      .get(`/api/wstb/get-date-latest-daily?userid=${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data, "2. 데일리활동량 - 데일리활동량 최신데이터");
          setDate(res.data?.datelatest);
          setDateRoute(res.data?.datelatest);

          if (auth?.grade_t === "병사") {
            _getDailyActivityTrand(
              auth.employee_number,
              res.data?.datelatest,
              "주"
            );
            _getDailyActivityTotal(auth.employee_number, res.data?.datelatest);
          } else {
            _getDailyActivityTrand(id, res.data?.datelatest, "주");
            _getDailyActivityTotal(id, res.data?.datelatest);
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

  const _getDailyActivityTotal = async (id, dateString) => {
    console.log(dateString);
    axios
      .get(`/api/wstb/get-daily-activity?userid=${id}&date=${dateString}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data, "2. 데일리활동량 - 데일리활동량");
          setDailyActivityTotal(res.data);
        } else if (res.status !== 200) {
          alert("서버 오류. 관리자에게 문의바랍니다.");
        }
      })
      .catch((err) => {
        alert("서버 오류. 관리자에게 문의바랍니다.");
        console.error(err);
      });
  };

  const _getDailyActivityTrand = async (id, dateString, type) => {
    axios
      .get(
        `/api/wstb/get-daily-activity-weekormonth?userid=${id}&date=${dateString}&weekormonth=${type}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data, "2. 데일리활동량 - 트랜드");
          setDailyActivityTrand(res.data);
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
          dailyActivityTotal={dailyActivityTotal}
          dailyActivityTrand={dailyActivityTrand}
          _getDailyActivityTrand={_getDailyActivityTrand}
          _getDailyActivityTotal={_getDailyActivityTotal}
          date={date}
          dateRoute={dateRoute}
          setDate={setDate}
          setDateRoute={setDateRoute}
        />
      ) : auth?.grade_t === "지휘관" || auth?.grade_t === "관리자" ? (
        <Commander
          auth={auth}
          dailyActivityTotal={dailyActivityTotal}
          dailyActivityTrand={dailyActivityTrand}
          _getDailyActivityTrand={_getDailyActivityTrand}
          _getDailyActivityTotal={_getDailyActivityTotal}
          date={date}
          dateRoute={dateRoute}
          setDate={setDate}
          setDateRoute={setDateRoute}
        />
      ) : null}
    </>
  );
};

export default Daily_Activity;
