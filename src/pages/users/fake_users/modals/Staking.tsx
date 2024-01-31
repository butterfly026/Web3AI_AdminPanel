import { MyModalDataContext, MyModalForm } from "@/common";
import {
  ProFormDigit,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-components";
import { useContext, useEffect, useRef } from "react";

export const Staking = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    formRef?.current?.setFieldsValue(item);
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.staking({ ...values, id: item?.id });
        return Promise.resolve();
      }}
    >
      <ProFormDigit label="ID" name="id" disabled />
      <ProFormText label="Nickname" name="nickname" disabled />
      <ProFormDigit
        label="Amount"
        name="amount"
        placeholder="The stake amount to increase"
        rules={[{ required: true }]}
      />
    </MyModalForm>
  );
};
