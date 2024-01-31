import { ProFormSelectProps } from "@ant-design/pro-components";
import { ProFormSelect } from "@ant-design/pro-form";

export const MyProFormSelect = ({
  name,
  label,
  rules,
  placeholder,
  request,
  ...rest
}: ProFormSelectProps) => {
  return (
    <ProFormSelect
      name={name}
      label={label}
      rules={rules}
      placeholder={placeholder}
      request={request}
      {...rest}
    />
  );
};
