import { Column } from "@ant-design/charts";
const BarChart_month = ({ arr }) => {
  console.log(arr, "4. 행동심리 - 차트로 들어가는 데이터");
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
    <div style={{ height: "10em", width: "100%" }}>
      <Column {...config} />
    </div>
  );
};
export default BarChart_month;
