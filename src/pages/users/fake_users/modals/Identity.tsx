import { MyModalDataContext, MyModalForm } from "@/common";
import {
  ProFormDigit,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-components";
import { useContext, useEffect, useRef } from "react";

export function Identity(props: any) {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    formRef?.current?.setFieldsValue(item);
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.identity({ ...values, id: item?.id });
        return Promise.resolve();
      }}
    >
      <ProFormDigit label="ID" name="id" disabled />
      <ProFormText label="NickName" name="nickname" disabled />
    </MyModalForm>
  );
}
