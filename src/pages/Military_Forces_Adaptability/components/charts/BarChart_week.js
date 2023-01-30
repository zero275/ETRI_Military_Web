import { Column } from "@ant-design/charts";
const BarChart_week = ({ arr }) => {
  console.log(arr, "6. 복무적응도 - 차트로 들어가는 데이터");
  const chartData = arr?.map((data) => {
    let xField = `${data.x}`;

    let yField = data.y;

    let res = { type: xField, 값: yField };
    return res;
  });

  let config = {
    data: chartData,
    xField: "type",
    yField: "값",
    yAxis: {
      max: 5,
    },
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
    <div style={{ height: "10em", width: "100%" }}>
      {chartData && <Column {...config} />}
    </div>
  );
};
export default BarChart_week;
