import React from "react";
import ReactEcharts from "echarts-for-react";

const BarChart_lastest = ({ safepoints_l, safepoints_r }) => {
  let color_l;
  let color_r;

  if (safepoints_l < 10) {
    color_l = "#c42e08";
  } else if (safepoints_l > 10 && safepoints_l < 30) {
    color_l = "#c46f08";
  } else if (safepoints_l >= 30 && safepoints_l < 50) {
    color_l = "#c4a808";
  } else if (safepoints_l >= 50 && safepoints_l < 70) {
    color_l = "#b4c408";
  } else if (safepoints_l >= 70 && safepoints_l < 80) {
    color_l = "#92c408";
  } else if (safepoints_l >= 80 && safepoints_l < 90) {
    color_l = "#69c408";
  } else if (safepoints_l >= 90 && safepoints_l <= 100) {
    color_l = "#08c424";
  }

  if (safepoints_r < 10) {
    color_r = "#c42e08";
  } else if (safepoints_r > 10 && safepoints_r < 30) {
    color_r = "#c46f08";
  } else if (safepoints_r > 30 && safepoints_r < 50) {
    color_l = "#c4a808";
  } else if (safepoints_r > 50 && safepoints_r < 70) {
    color_r = "#b4c408";
  } else if (safepoints_r > 70 && safepoints_r < 80) {
    color_r = "#92c408";
  } else if (safepoints_r > 80 && safepoints_r < 90) {
    color_r = "#69c408";
  } else if (safepoints_r > 90 && safepoints_r <= 100) {
    color_r = "#08c424";
  }
  const symbols = [
    "path://M0 0h114.06s-8 75.37-12.35 119-3.81 45.22-6.54 61.57-6.54 28.87-6.81 37.05 7.9 32.15 5.72 77.92-.27 76.55 0 88 6 42.78 9.81 51.49 9.44 20.44 10.17 32.42-.77 15.4-6.08 16.49-68.39 6.67-66.75-10.22 11.44-24.52 12-36.51 3.27-43 0-54.48-38.7-76.15-35.07-117.56 10.9-50.85 11.63-56.66-.73-53.76-5.82-82.1S5.81 93 0 17.44Z",
    "path://M114.23 0H.17s8 75.37 12.35 119 3.82 45.22 6.54 61.57 6.54 28.87 6.81 37.05-7.9 32.15-5.72 77.92.27 76.55 0 88-6 42.78-9.81 51.49S.9 455.43.17 467.41s.77 15.4 6.09 16.49 68.38 6.67 66.74-10.22-11.44-24.52-12-36.51-3.27-43 0-54.48 38.68-76.11 35-117.52-10.9-50.85-11.62-56.66.72-53.76 5.81-82.1 18.16-33.42 24-109Z",
  ];
  const bodyMax = 100;
  const labelSetting = {
    show: true,
    position: "top",
    offset: [0, -20],
    formatter: function (param) {
      return ((param.value / bodyMax) * 100).toFixed(0) + "%";
    },
    fontSize: 18,
  };
  const markLineSetting = {
    symbol: "none",
    lineStyle: {
      opacity: 0.3,
    },
    data: [
      {
        type: "max",
        label: {
          formatter: "max: {c}",
        },
      },
      {
        type: "min",
        label: {
          formatter: "min: {c}",
        },
      },
    ],
  };
  let option = {
    tooltip: {},
    title: {
      text: "무릎 부상 안전도",
      left: "center",
    },
    xAxis: {
      data: ["왼", "오"],
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { show: false },
    },
    yAxis: {
      max: bodyMax,
      offset: 20,
      splitLine: { show: false },
    },
    grid: {
      top: "center",
      height: "70%",
      width: "70%",
      left: "center",
    },
    markLine: {
      z: -100,
    },
    // visualMap: {
    //   orient: "horizontal",
    //   left: "center",
    //   min: 0,
    //   max: 100,
    //   text: ["매우 좋음", "매우 나쁨"],
    //   // Map the score column to color
    //   dimension: 1,
    //   inRange: {
    //     color: ["#FD665F", "#FFCE34", "#65B581"],
    //   },
    // },
    series: [
      {
        name: "무릎",
        type: "pictorialBar",
        symbolClip: true,
        symbolBoundingData: bodyMax,
        label: labelSetting,
        data: [
          {
            value: safepoints_l,
            symbol: symbols[0],
            itemStyle: {
              color: color_l,
            },
          },
          {
            value: safepoints_r,
            symbol: symbols[1],
            itemStyle: {
              color: color_r,
            },
          },
        ],
        markLine: markLineSetting,
        z: 10,
      },

      {
        name: "무릎",
        type: "pictorialBar",
        symbolBoundingData: bodyMax,
        animationDuration: 0,
        itemStyle: {
          color: "#ccc",
        },
        data: [
          {
            value: 0,
            symbol: symbols[0],
          },
          {
            value: 0,
            symbol: symbols[1],
          },
        ],
      },
    ],
  };
  return (
    <ReactEcharts option={option} style={{ height: "40em", width: "30em" }} />
  );
};

export default BarChart_lastest;
