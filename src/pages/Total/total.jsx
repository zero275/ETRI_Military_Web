import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStoreAuth } from "../../store/authStore";
import Private from "./components/Private/private";
import Commander from "./components/Commander/commander";
import { useStoreName } from "../../store/namesStore";

const Total = () => {
  const [totalList, setTotalList] = useState({});
  const setNameList = useStoreName((state) => state.setNameList);
  const auth = useStoreAuth((state) => state.auth);
  console.log(auth);
  const _getTotalList = () => {
    axios
      .get(
        `/api/index/get-overall-index-personal?userid=${auth.employee_number}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data, "1. 종합지수 - 전체 데이터");
          setTotalList(res.data);
        } else if (res.status !== 200) {
          alert("서버 오류. 관리자에게 문의바랍니다.");
        }
      })
      .catch((err) => {
        alert("서버 오류. 관리자에게 문의바랍니다.");
        console.error(err);
      });
  };

  const _getTotalList_commander = () => {
    axios
      .get(
        `/api/index/get-overall-index-personal-org?userid=${auth.employee_number}`
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data, "1. 종합지수 - 전체 데이터");
          setTotalList(res.data);

          const soldierNames = [];
          res.data.data.map((list) => {
            soldierNames.push(list);
          });
          sessionStorage.setItem("soldierNames", JSON.stringify(soldierNames));
          setNameList(soldierNames);
        } else if (res.status !== 200) {
          alert("서버 오류. 관리자에게 문의바랍니다.");
        }
      })
      .catch((err) => {
        alert("서버 오류. 관리자에게 문의바랍니다.");
        console.error(err);
      });
  };

  useEffect(() => {
    if (auth?.grade_t === "병사") {
      _getTotalList();
    } else if (auth?.grade_t === "지휘관" || auth?.grade_t === "관리자") {
      _getTotalList_commander();
    }
  }, [auth]);

  // 하단 그래프 data

  return (
    <>
      {auth?.grade_t === "병사" ? (
        <Private auth={auth} totalList={totalList} />
      ) : auth?.grade_t === "지휘관" || auth?.grade_t === "관리자" ? (
        <Commander auth={auth} totalList={totalList} />
      ) : null}
    </>
  );
};

export default Total;
