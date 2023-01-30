import React from "react";

import { Button, Result } from "antd";

import { NavLink } from "react-router-dom";

const ErrorPage = ({ auth }) => {
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="찾을수 없는 페이지 입니다. 요청하신 페이지가 사라졌거나, 잘못된 경로를 이용하셨습니다."
        extra={
          auth ? (
            <Button>
              <NavLink to="/">홈 바로가기</NavLink>
            </Button>
          ) : (
            <Button>
              <NavLink to="/login">로그인 바로가기</NavLink>
            </Button>
          )
        }
      />
    </>
  );
};

export default ErrorPage;
