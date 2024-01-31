import { Tag } from "antd";

export const MyEnumTag = ({ items, value }: any) => {
  let color = "";
  items.forEach((item: any) => {
    if (item.label === value) color = item.color;
  });
  return <Tag color={color}>{value}</Tag>;
};
