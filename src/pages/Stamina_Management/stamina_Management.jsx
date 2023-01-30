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
import Private from "./components/Private/private";
import { useStoreAuth } from "../../store/authStore";
import moment from "moment";
import Commander from "./components/Commander/commander";
import { useStoreName } from "../../store/namesStore";
const Stamina_Management = () => {
  const [rank, setRank] = useState({});
  const [staminaList, setStaminaList] = useState({});
  const [date, setDate] = useState("");

  const id = useStoreName((state) => state.id);
  const auth = useStoreAuth((state) => state.auth);

  useEffect(() => {
    if (auth?.grade_t === "병사") {
      _getMyRank(auth.employee_number);
      _getStamina(auth.employee_number, moment().format("YYYY-MM-DD"));
    } else if (
      (auth?.grade_t === "지휘관" || auth?.grade_t === "관리자") &&
      id
    ) {
      _getMyRank(id);
      _getStamina(id, moment().format("YYYY-MM-DD"));
    }
  }, [auth, id]);

  const _getMyRank = async (id) => {
    axios
      .get(`/api/sgfb/get-latest?userid=${id}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data, "3. 체력관리 - 내 랭크 데이터");
          setRank(res.data);
          setDate(res.data.date);
          if (auth?.grade_t === "병사") {
            _getStamina(auth.employee_number, res.data.date);
          } else if (
            (auth?.grade_t === "지휘관" || auth?.grade_t === "관리자") &&
            id
          ) {
            _getStamina(id, res.data.date);
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

  const _getStamina = async (id, dateString) => {
    let inputDate = dateString || moment().format("YYYY-MM-DD");
    axios
      .get(`/api/sgfb/get-monthly?userid=${id}&date=${inputDate}`)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data, "3. 체력관리 - 체력지수 데이터");
          setStaminaList(res.data);
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
          staminaList={staminaList}
          rank={rank}
          auth={auth}
          _getStamina={_getStamina}
          date={date}
          setDate={setDate}
        />
      ) : auth?.grade_t === "지휘관" || auth?.grade_t === "관리자" ? (
        <Commander
          staminaList={staminaList}
          rank={rank}
          auth={auth}
          _getStamina={_getStamina}
          date={date}
          setDate={setDate}
        />
      ) : null}
    </>
  );
};

export default Stamina_Management;
