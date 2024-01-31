import { Line } from "@ant-design/charts";
import { StatisticCard } from "@ant-design/pro-components";
import { Card, Col, Row } from "antd";
import ColItems from "./ColItems";

const trendList = [
  { title: "总注册用户数", bgcolor: "#2196f3" },
  { title: "总成交金额", bgcolor: "#22c35e" },
  { title: "累计买", bgcolor: "#dd6b20" },
  { title: "累计卖", bgcolor: "#d53f8c" },
];
export default function Trend() {
  const DemoLine = () => {
    const config: any = {
      data: [
        {
          Date: "2010-01",
          scales: 100,
        },
        {
          Date: "2010-02",
          scales: 200,
        },
        {
          Date: "2010-03",
          scales: 120,
        },
        {
          Date: "2010-04",
          scales: 130,
        },
        {
          Date: "2010-05",
          scales: 90,
        },
        {
          Date: "2010-06",
          scales: 102,
        },
      ],
      padding: "auto",
      xField: "Date",
      yField: "scales",
      xAxis: {
        // type: 'timeCat',
        tickCount: 4,
      },
    };

    return <Line {...config} />;
  };
  return (
    <Card title="整体趋势">
      <Row gutter={[10, 10]}>
        {trendList?.map((res: any, index: number) => {
          return (
            <Col span={12} key={`col_${index}`}>
              <ColItems title={res?.title} bgcolor={res?.bgcolor} />
            </Col>
          );
        })}
      </Row>
      <StatisticCard chart={<DemoLine />} />
    </Card>
  );
}
