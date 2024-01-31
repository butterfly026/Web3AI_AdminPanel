import { MyColorPicker, MyModalForm } from "@/common";
import { ProFormText } from "@ant-design/pro-form";

export const Create = (props: any) => {
  return (
    <MyModalForm
      onFinish={(values: any) => {
        props.actions?.store(values);
        return Promise.resolve();
      }}
    >
      <ProFormText name="name" placeholder="RoleName" label="RoleName" />
      <MyColorPicker name="color" label="Color" />
    </MyModalForm>
  );
};
