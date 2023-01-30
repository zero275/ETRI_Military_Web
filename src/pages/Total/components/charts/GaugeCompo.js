import { RingProgress } from "@ant-design/charts";
import { Progress } from "antd";
import { memo } from "react";

const GaugeCompo = ({ content, offsetY, value, _width }) => {
  return (
    <Progress
      width={_width}
      strokeLinecap="square"
      type="circle"
      strokeColor={{
        "0%": "#108ee9",
        "100%": "#108ee9",
      }}
      percent={parseInt(value)}
      format={() => (
        <div className="progressbar_circle_wrap">
          <div style={{ fontSize: "1.5em", fontWeight: "500" }}>{content}</div>
          <div style={{ fontSize: "2em", fontWeight: "800" }}>{value}</div>
        </div>
      )}
    />
  );
};

export default memo(GaugeCompo);
