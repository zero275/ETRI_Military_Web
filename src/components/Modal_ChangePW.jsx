import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useStoreAuth } from "../store/authStore";
import { useStoreUser } from "../store/userStore";

const { Option } = Select;

const Modal_ChangePW = ({ visible, setVisible }) => {
  const auth = useStoreAuth((state) => state.auth);
  const userList = useStoreUser((state) => state.userList);
  const [passWord, setPassWord] = useState(null);
  const [passWord_check, setPassWord_check] = useState(null);
  const [isUserSelect, setIsUserSelect] = useState(false);
  const [userName, setUserName] = useState(null);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);

  const formRef = useRef(null);

  const _initailizeModal = () => {
    setVisible(false);
    setPassWord(null);
    setPassWord_check(null);
    setIsUserSelect(false);
    setUserName(null);
    setId(null);
    formRef?.current?.resetFields(); // Form 초기화
  };

  const _changePassword = async () => {
    const inputData = {
      id: id || auth?.employee_number,
      pw: passWord,
    };
    setLoading(true);
    await axios
      .post(`/api/user-change-pw`, inputData) //
      .then((res) => {
        if (res?.status === 200) {
          if (res.data.result === "N") {
            alert(res.data.msg);
            setLoading(false);
          } else if (res.data.result === "Y") {
            alert("변경이 완료되었습니다.");
            _initailizeModal();
            setLoading(false);
          }
        } else if (res.status !== 200) {
          setLoading(false);
          alert("관리자에게 문의 바랍니다.");
        }
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert("관리자에게 문의 바랍니다.");
      });
  };

  const _selectUser = (record) => {
    setIsUserSelect(true);
    setUserName(record.name);
    setId(record.value);
  };

  return (
    <>
      {auth.grade_t === "관리자" ? (
        <Modal
          title="유저 비밀번호 변경"
          visible={visible}
          onOk={_changePassword}
          onCancel={_initailizeModal}
          okText="변경"
          cancelText="취소"
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          footer={null}
        >
          <div>
            <Select
              className="userSelector"
              autoFocus
              showSearch
              placeholder="유저를 선택하세요"
              optionFilterProp="children"
              filterOption={(input, option) => option.children.includes(input)}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              onSelect={(e, record) => {
                _selectUser(record);
              }}
              style={{ marginBottom: "24px", width: "100%" }}
              value={id}
            >
              {userList?.map((name) => {
                return (
                  <Option value={name.employee_number} name={name.person_name}>
                    {`${name.employee_number}-${name.person_name}`}
                  </Option>
                );
              })}
            </Select>
          </div>

          {isUserSelect && (
            <>
              <Form onFinish={_changePassword} ref={formRef} layout="vertical">
                <Form.Item required label="이름">
                  {userName}
                </Form.Item>
                <Form.Item required label="군번">
                  {id}
                </Form.Item>
                <Form.Item
                  label="비밀번호"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "변경하실 비밀번호를 입력해주세요!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    style={{ borderRadius: "10px" }}
                    size="large"
                    type="number"
                    placeholder="변경하실 비밀번호를 입력해주세요"
                    onChange={({ target }) => {
                      const { value } = target;
                      setPassWord(value);
                    }}
                    value={passWord}
                  />
                </Form.Item>

                <Form.Item
                  label="비밀번호 확인"
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "변경할 비밀번호를 다시 입력해주세요!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("비밀번호가 일치하지 않습니다!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input
                    style={{ borderRadius: "10px" }}
                    size="large"
                    type="number"
                    placeholder="변경하실 비밀번호를 다시 입력해주세요"
                    onChange={({ target }) => setPassWord_check(target.value)}
                    value={passWord_check}
                  />
                </Form.Item>
                <div className="flex-end-row">
                  <Form.Item style={{ margin: "0", marginRight: "0.5em" }}>
                    <Button onClick={_initailizeModal}>취소</Button>
                  </Form.Item>
                  <Form.Item style={{ margin: "0" }}>
                    <Button type="primary" htmlType="submit">
                      변경
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </>
          )}
        </Modal>
      ) : (
        <Modal
          title="나의 비밀번호 변경"
          width={500}
          visible={visible}
          onOk={_changePassword}
          onCancel={_initailizeModal}
          okText="변경"
          cancelText="취소"
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          footer={null}
        >
          <Form onFinish={_changePassword} ref={formRef} layout="vertical">
            <Form.Item
              label="비밀번호"
              name="number"
              rules={[
                {
                  required: true,
                  message: "변경하실 비밀번호를 입력해주세요!",
                },
              ]}
              hasFeedback
            >
              <Input
                style={{ borderRadius: "10px" }}
                size="large"
                type="password"
                placeholder="변경하실 비밀번호를 입력해주세요"
                onChange={({ target }) => setPassWord(target.value)}
                value={passWord}
              />
            </Form.Item>

            <Form.Item
              label="비밀번호 확인"
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "변경할 비밀번호를 다시 입력해주세요!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("비밀번호가 일치하지 않습니다!")
                    );
                  },
                }),
              ]}
            >
              <Input
                style={{ borderRadius: "10px" }}
                size="large"
                type="number"
                placeholder="변경하실 비밀번호를 다시 입력해주세요"
                onChange={({ target }) => setPassWord_check(target.value)}
                value={passWord_check}
              />
            </Form.Item>
            <div className="flex-end-row">
              <Form.Item style={{ margin: "0", marginRight: "0.5em" }}>
                <Button onClick={_initailizeModal}>취소</Button>
              </Form.Item>
              <Form.Item style={{ margin: "0" }}>
                <Button type="primary" htmlType="submit">
                  변경
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Modal>
      )}

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
    </>
  );
};

export default Modal_ChangePW;
