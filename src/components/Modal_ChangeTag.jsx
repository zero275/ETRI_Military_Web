import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, Select, Spin } from "antd";
import { useStoreAuth } from "../store/authStore";
import { useStoreUser } from "../store/userStore";
import axios from "axios";

const { Option } = Select;

const Modal_ChangeTag = ({ visible, setVisible }) => {
  const auth = useStoreAuth((state) => state.auth);
  const userList = useStoreUser((state) => state.userList);

  const [id, setId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [tagid, setTagid] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUserSelect, setIsUserSelect] = useState(false);

  const formRef = useRef(null);

  const _initailizeModal = () => {
    setVisible(false);
    setIsUserSelect(false);
    setUserName(null);
    setId(null);
    formRef?.current?.resetFields(); // Form 초기화
  };

  const _changeTagid = async () => {
    const inputData = {
      id: id || auth?.employee_number,
      tagid: tagid,
    };
    setLoading(true);
    await axios
      .post(`/api/user-change-tagid`, inputData) //
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
    <div>
      {auth.grade_t === "관리자" && (
        <Modal
          title="유저 태그 아이디 변경"
          visible={visible}
          onOk={_changeTagid}
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
              <Form onFinish={_changeTagid} ref={formRef} layout="vertical">
                <Form.Item required label="이름">
                  {userName}
                </Form.Item>
                <Form.Item required label="군번">
                  {id}
                </Form.Item>
                <Form.Item
                  label="태그 아이디"
                  name="tagid"
                  rules={[
                    {
                      required: true,
                      message: "변경하실 태그 아이디를 입력해주세요!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    style={{ borderRadius: "10px" }}
                    size="large"
                    type="number"
                    placeholder="변경하실 태그 아이디를 입력해주세요"
                    onChange={({ target }) => setTagid(target.value)}
                    value={tagid}
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
    </div>
  );
};

export default Modal_ChangeTag;
