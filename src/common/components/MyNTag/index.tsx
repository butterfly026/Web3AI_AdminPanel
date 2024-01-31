import { Tag } from "antd";

export const MyNTag = ({ items = [], value, ...rest }: any) => {
  let color = "";
  let label = "";
  items.map((res: any) => {
    if (res.value == value) {
      label = res.label;
      color = res.color;
    }
  });
  return (
    <Tag color={color} {...rest}>
      {label}
    </Tag>
  );
};
