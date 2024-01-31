import { MyModalDataContext, MyModalForm } from "@/common";
import {
  ProFormDigit,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-components";
import { useContext, useEffect, useRef } from "react";

export default function Withdraw(props: any) {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    formRef?.current?.setFieldsValue({
      id: item?.id,
      nickname: item?.nickname,
      can_withdraw_amount: item?.user?.withdraw?.[0].balance,
    });
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.withdraw({ ...values });
        return Promise.resolve();
      }}
    >
      <ProFormDigit label="ID" name="id" disabled />
      <ProFormText label="Nickname" name="nickname" disabled />
      <ProFormDigit
        label="Can Withdraw Amount"
        name="can_withdraw_amount"
        rules={[{ required: true }]}
        disabled
      />
      <ProFormDigit
        label="Withdraw Amount"
        name="amount"
        rules={[{ required: true }]}
      />
    </MyModalForm>
  );
}
