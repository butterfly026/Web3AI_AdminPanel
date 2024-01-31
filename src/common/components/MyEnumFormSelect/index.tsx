import { ProFormSelectProps } from "@ant-design/pro-components";
import { ProFormSelect } from "@ant-design/pro-form";

export const MyEnumFormSelect = ({
  name,
  label,
  rules,
  placeholder,
  items,
  ...rest
}: { items: any[] } & ProFormSelectProps) => {
  const opt = items?.map((item) => ({
    label: item.label,
    value: item.value,
  }));
  return (
    <ProFormSelect
      name={name}
      label={label}
      rules={rules}
      placeholder={placeholder}
      options={opt}
      {...rest}
    />
  );
};
