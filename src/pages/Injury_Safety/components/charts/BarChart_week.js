import { Column } from "@ant-design/charts";
const BarChart_week = ({ arr }) => {
  console.log(arr, "5. 무릎부상안전도 - 차트로 들어가는 데이터");
  const chartData = arr?.map((data, index) => {
    let xField = `${data.x}`;

    let yField = Number(data.y);

    let res = { type: xField, 값: yField };
    return res;
  });
  console.log(chartData);

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
    <div style={{ height: "10em", width: "100%" }}>
      <Column {...config} />
    </div>
  );
};
export default BarChart_week;
