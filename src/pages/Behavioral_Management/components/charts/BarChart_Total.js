import React, { useEffect } from "react";

import ReactEcharts from "echarts-for-react";

const BarChart_Total = ({ data }) => {
  console.log(data, "4. 행동심리 - 최신 차트로 들어가는 데이터");
  const arr = [];
  arr.push(["score", "amount", "type"]);
  // arr.push([data?.brain_med_z_norm, data?.brain_med_z_norm, "이완력"]);
  // arr.push([data?.brain_att_z_norm, data?.brain_att_z_norm, "집중력"]);
  arr.push([data?.hrv_ans_z_norm, data?.hrv_ans_z_norm, "신체 활력도"]);
  arr.push([data?.hrv_index_z_norm, data?.hrv_index_z_norm, "스트레스 저항성"]);

  const option = {
    dataset: {
      source: arr,
      //   source: [
      //     ["score", "amount", "type"],
      //     [1, 1, "이완력"],
      //     [3, 3, "집중력"],
      //     [5, 5, "신체 활력도"],
      //     [4, 4, "스트레스 저항성"],
      //   ],
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: 10,
      top: 10,
      right: 10,
      bottom: 60,
      containLabel: true,
    },
    legend: {
      data: ["스트레스 저항성", "신체 활력도"],
    },
    xAxis: {
      name: "amount",
      min: 0,
      max: 5,
    },
    yAxis: {
      type: "category",
    },
    visualMap: {
      orient: "horizontal",
      left: "center",
      min: 0,
      max: 5,
      text: ["매우 좋음", "매우 나쁨"],
      // Map the score column to color
      dimension: 0,
      inRange: {
        color: ["#FD665F", "#FFCE34", "#65B581"],
      },
    },
    series: [
      {
        type: "bar",
        encode: {
          // Map the "amount" column to X axis.
          x: "amount",
          // Map the "product" column to Y axis
          y: "type",
        },
      },
    ],
  };
  return (
    <ReactEcharts option={option} style={{ width: "40em", height: "20em" }} />
  );
};

export default BarChart_Total;
