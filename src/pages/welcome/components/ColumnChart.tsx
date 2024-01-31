import { Column } from "@ant-design/charts";
import { Tabs } from "antd";

export default function ColumnChart() {
  const DemoColumn = () => {
    const data = [
      {
        type: "1月",
        sales: 38,
      },
      {
        type: "2月",
        sales: 52,
      },
      {
        type: "3月",
        sales: 61,
      },
      {
        type: "4月",
        sales: 105,
      },
      {
        type: "5月",
        sales: 48,
      },
      {
        type: "6月",
        sales: 78,
      },
      {
        type: "7月",
        sales: 58,
      },
      {
        type: "8月",
        sales: 38,
      },
      {
        type: "9月",
        sales: 48,
      },
      {
        type: "10月",
        sales: 68,
      },
      {
        type: "11月",
        sales: 58,
      },
      {
        type: "12月",
        sales: 48,
      },
    ];
    const config: any = {
      data,
      height: 497,
      xField: "type",
      yField: "sales",
      label: {
        // 可手动配置 label 数据标签位置
        position: "middle",
        // 'top', 'bottom', 'middle',
        // 配置样式
        style: {
          fill: "#FFFFFF",
          opacity: 0.6,
        },
      },
      xAxis: {
        label: {
          autoHide: true,
          autoRotate: false,
        },
      },
      meta: {
        type: {
          alias: "类别",
        },
        sales: {
          alias: "销售额",
        },
      },
    };
    return <Column {...config} />;
  };
  return (
    <div>
      <Tabs
        defaultActiveKey="销售额"
        items={[
          { label: "销售额", key: "销售额" },
          { label: "访问量", key: "访问量" },
        ]}
      />
      <div style={{ padding: "1.2rem 0" }}>
        <DemoColumn />
      </div>
    </div>
  );
}
