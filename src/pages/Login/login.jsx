import React, { useState } from "react";
import axios from "axios";
import { Button, Spin, Form, Input } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStoreAuth } from "../../store/authStore";
import { useStoreUser } from "../../store/userStore";
const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setAuth = useStoreAuth((state) => state.setAuth);
  const setUserList = useStoreUser((state) => state.setUserList);
  const navigate = useNavigate();

  function isEmptyObj(obj) {
    if (obj.constructor === Object && Object.keys(obj).length === 0) {
      return true;
    }

    return false;
  }

  const handleLogin = async (e) => {
    // e.preventDefault();
    const inputData = {
      id: id,
      pw: password,
    };
    setLoading(true);

    await axios
      .get(`/api/user-login2?id=${inputData.id}&pw=${inputData.pw}`) //
      .then((res) => {
        if (res?.status === 200) {
          if (res.data.result === "N") {
            alert("군번 혹은 비밀번호를 확인해주세요.");
            setLoading(false);
          } else if (res.data.result === "Y") {
            setLoading(false);
            let userInfo = res.data.data;
            let grade_t = res.data.grade_t;
            console.log(userInfo);
            userInfo.grade_t = grade_t;
            const userlist = res.data.userlist || [];
            console.log(res.data.userlist);
            if (isEmptyObj(userInfo) || !grade_t) {
              return alert("데이터 오류. 관리자에게 문의 바랍니다.");
            } else {
              sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
              sessionStorage.setItem("userlist", JSON.stringify(userlist));
              setUserList(userlist); // 전역 변수에 저장
              setAuth(userInfo); //전역 변수에 저장
              navigate("/Total", { replace: true });
            }
          }
        } else if (res.status !== 200) {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  return (
    <>
      <main className="login-container">
        <div className="login-form-image-wrap">
          <h2 style={{ fontSize: "2em" }}>STRONG LOGIN</h2>
          <Form
            className="login-form"
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
            autoComplete="off"
          >
            <Form.Item
              name="아이디"
              rules={[
                {
                  required: true,
                  message: "아이디를 입력해주세요!",
                },
              ]}
            >
              <Input
                style={{ height: "3em" }}
                placeholder="아이디"
                onChange={({ target }) => setId(target.value)}
                value={id}
              />
            </Form.Item>

            <Form.Item
              name="비밀번호"
              rules={[
                {
                  required: true,
                  message: "비밀번호를 입력해주세요!",
                },
              ]}
            >
              <Input.Password
                style={{ height: "3em" }}
                placeholder="비밀번호"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                style={{ width: "100%", height: "3em" }}
                type="primary"
                htmlType="submit"
              >
                로그인
              </Button>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button disabled style={{ width: "100%", height: "3em" }}>
                회원가입
              </Button>
            </Form.Item>
          </Form>
        </div>

        {loading ? (
          <div
            style={{
              position: "fixed",
              top: "0",
              left: "0",
              width: "100vw",
              height: "100vh",
              zIndex: "10",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                zIndex: "9999",
              }}
            >
              <Spin size="large" />
            </div>
          </div>
        ) : null}
      </main>
    </>
  );
};

export default Login;
