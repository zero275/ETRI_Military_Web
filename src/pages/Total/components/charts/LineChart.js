import React, { memo, useEffect } from "react";
import ReactEcharts from "echarts-for-react";
import moment from "moment";

const LineChart = ({ data }) => {
  const dateArr = [];
  const now = new Date();
  data.forEach((date, index) => {
    if (index === 0) {
      dateArr.push(moment().format("MM/DD"));
    } else {
      dateArr.unshift(moment(now.setDate(now.getDate() - 1)).format("MM/DD"));
    }
  });

  let option = {
    legend: {
      data: ["STRONG지수"],
    },
    tooltip: {
      trigger: "axis",
    },
    grid: {
      top: "center",
      height: "70%",
      width: "75%",
      left: "center",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: dateArr,
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
    },
    series: [
      {
        name: "STRONG지수",
        data: data,
        type: "line",
        areaStyle: {},
        itemStyle: {
          color: "",
        },
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: "13em" }} />;
};

export default memo(LineChart);
