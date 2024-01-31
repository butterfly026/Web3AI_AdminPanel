import {
  ProFormRadio,
  ProFormRadioGroupProps,
} from "@ant-design/pro-components";

export const MyEnumFormRadioGroup = ({
  name,
  label,
  rules,
  items,
  fieldProps,
  onChange,
  ...rest
}: { items: any[] } & ProFormRadioGroupProps) => {
  const opt = items?.map((item) => ({
    label: item.label,
    value: item.value,
  }));
  return (
    <ProFormRadio.Group
      name={name}
      label={label}
      rules={rules}
      radioType="button"
      fieldProps={{ buttonStyle: "solid", ...fieldProps }}
      options={opt}
      onChange={onChange}
      {...rest}
    />
  );
};
