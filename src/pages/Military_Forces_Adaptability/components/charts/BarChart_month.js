import { Column } from "@ant-design/charts";
const BarChart_month = ({ arr }) => {
  console.log(arr, "6. 복무적응도 - 차트로 들어가는 데이터");

  let color_body;

  const chartData = arr?.map((data) => {
    let xField = `${data.x}일`;

    let yField = data.y;

    let res = { type: xField, 값: yField };
    return res;
  });

  let config = {
    data: chartData,
    yAxis: {
      max: 5,
    },
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
      {chartData && <Column {...config} />}
    </div>
  );
};
export default BarChart_month;
