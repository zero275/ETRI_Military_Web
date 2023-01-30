import React, { memo, useEffect } from "react";
import { Column } from "@ant-design/charts";

const IntroColumn = ({ arr }) => {
  useEffect(() => {
    console.log(arr, "1. 종합지수 - 종합 지수 차트 데이터");
  }, [arr]);

  let data = arr ? arr : [];

  const labelColor = (value) => {
    if (value.y <= 0) {
      return "lightgrey";
    } else if (value.y >= 80) {
      return "red";
    }
  };

  var config = {
    data: data,

    xField: "type",
    yField: "y",

    minColumnWidth: 15,
    maxColumnWidth: 15,

    color: function (value) {
      // var type = value ? value.type : "";

      // if (
      //   type === "복무적응도" ||
      //   type === "사고안전도" ||
      //   type === "인재역량"
      // ) {
      //   return "lightgrey";
      // }
      return "#369c62";
    },

    columnStyle: {
      radius: [20, 20, 0, 0],
    },

    label: {
      position: "top",
      style: {
        // opacity: 0.6,
        fill: labelColor(data),
        // fill: function (value) {
        //   if (value.y <= 0) {
        //     return "green";
        //   } else if (value.y >= 80) {
        //     return "orange";
        //   }
        // },
      },
      formatter: function (value) {
        return value.y;
      },
    },

    xAxis: {
      label: {
        autoHide: true,
        autoRatate: false,
      },
    },

    tooltip: {
      formatter: function formatter(value) {
        return {
          name: `지수 `,
          value: value.y,
        };
      },
    },
  };

  return (
    <>
      <Column
        {...config}
        style={{
          width: "30em",
          height: "20em",
          margin: "auto",
        }}
      />
    </>
  );
};

export default memo(IntroColumn);
