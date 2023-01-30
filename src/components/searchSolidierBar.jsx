import { SearchOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";
import React, { useState } from "react";
import { useStoreName } from "../store/namesStore";
const { Option } = Select;
const SearchSolidierBar = () => {
  const nameList = useStoreName((state) => state.nameList);
  const name = useStoreName((state) => state.name);
  const setName = useStoreName((state) => state.setName);
  const id = useStoreName((state) => state.id);
  const setId = useStoreName((state) => state.setId);
  const [tempId, setTempId] = useState(null);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        position: "fixed",
        right: "10em",
        top: "3em",
        width: "20em",
        height: "5em",
        zIndex: "10",
        borderRadius: "50%",
      }}
    >
      <Select
        autoFocus
        className="search_soldier"
        style={{
          width: "20em",
          height: "3em",
          borderRadius: "10px",
        }}
        showSearch
        placeholder="병사를 선택하세요"
        optionFilterProp="children"
        filterOption={(input, option) => option.children.includes(input)}
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        onSelect={(e, record) => {
          setTempId(record.key);
          setName(record.value);
        }}
        value={name}
      >
        {nameList?.map((name) => {
          return (
            <Option value={name.person_name} key={name.employee_number}>
              {name.person_name}
            </Option>
          );
        })}
      </Select>

      <Button
        style={{
          marginLeft: "0.5em",
          width: "3em",
          height: "3em",
          borderRadius: "50%",
        }}
        onClick={() => setId(tempId)}
      >
        <SearchOutlined />
      </Button>
    </div>
  );
};

export default SearchSolidierBar;
