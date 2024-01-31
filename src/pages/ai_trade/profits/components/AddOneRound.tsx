import { MyModalForm } from "@/common";
import { ProFormInstance, ProFormText } from "@ant-design/pro-components";
import { useRef } from "react";

export const AddOneRound = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.add_one_round(values);
        return Promise.resolve();
      }}
    >
      <ProFormText
        label="address"
        name="address"
        rules={[{ required: true }]}
      />
    </MyModalForm>
  );
};
