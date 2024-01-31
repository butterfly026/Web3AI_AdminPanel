import { ProFormRadioGroupProps } from "@ant-design/pro-components";
import { ProFormRadio } from "@ant-design/pro-form";

export const MyProFormRadioGroup = ({ ...rest }: ProFormRadioGroupProps) => {
  return (
    <ProFormRadio.Group
      radioType="button"
      fieldProps={{ buttonStyle: "solid" }}
      {...rest}
    />
  );
};
