import { Column } from "@ant-design/charts";
import { useState } from "react";

const BarChart = ({ arr }) => {
  // console.log(arr);
  // const newArr = arr[0]?.data;
  const chartData = arr?.map((data) => {
    let xField = `${data.x}일`;

    let yField = data.y;

    let res = { type: xField, 값: yField };
    return res;
  });

  let config = {
    data: chartData,
    xField: "type",
    yField: "값",
    legend: false,
    label: {
      offset: 10,
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: "0",
      },
    },
  };

  return (
    <div style={{ height: "10em", width: "50vw" }}>
      <Column {...config} />
    </div>
  );
};
export default BarChart;
