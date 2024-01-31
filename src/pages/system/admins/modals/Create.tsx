import { MyModalForm } from "@/common";
import XSelect from "@/components/XSelect";
import { ProFormText } from "@ant-design/pro-components";

export const Create = (props: any) => {
  return (
    <MyModalForm
      onFinish={(values: any) => {
        props.actions?.store(values);
        return Promise.resolve();
      }}
    >
      <ProFormText name="username" placeholder="User" label="User" />
      <ProFormText.Password name="password" placeholder="Password" label="Password" />
      <XSelect.SysRoles />
    </MyModalForm>
  );
};
