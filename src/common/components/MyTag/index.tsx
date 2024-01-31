import type { TagProps } from "antd";
import { Tag } from "antd";

export type MyTagProps = TagProps & {
  colors: Record<string, string>;
  value: string;
};

export const MyTag = ({ colors = [], value, ...rest }: any) => {
  return (
    <Tag color={colors ? colors[value] : ""} {...rest}>
      {value ?? "-"}
    </Tag>
  );
};
