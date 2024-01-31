import { MyModalForm } from "@/common";
import XTreeSelect from "@/components/XTreeSelect";
import { ProFormText } from "@ant-design/pro-form";

export const Create = (props: any) => {
  return (
    <MyModalForm
      onFinish={(values: any) => {
        props.actions?.store(values);
        return Promise.resolve();
      }}
    >
      <XTreeSelect.SysPermissions />
      <ProFormText name="title" placeholder="MenuName" label="MenuName" />
      <ProFormText name="name" placeholder="MenuLogo" label="MenuLogo" />
      <ProFormText name="url" placeholder="Url" label="Url" />
    </MyModalForm>
  );
};
