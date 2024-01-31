import { MyModalDataContext, MyModalForm } from "@/common";
import XTreeSelect from "@/components/XTreeSelect";
import type { ProFormInstance } from "@ant-design/pro-form";
import { ProFormText } from "@ant-design/pro-form";
import { useContext, useEffect, useRef } from "react";

export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    formRef?.current?.setFieldsValue(item);
    console.log("Update useEffect:::", item);
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.update({ ...values, id: item?.id });
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
