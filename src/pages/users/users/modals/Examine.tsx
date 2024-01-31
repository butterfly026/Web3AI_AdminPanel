import { MyModalDataContext, MyModalForm } from "@/common";
import { ProFormInstance, ProFormText } from "@ant-design/pro-components";
import { useContext, useEffect, useRef } from "react";

export const Examine = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    console.log("update item", item);
    formRef?.current?.setFieldsValue(item);
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.update({ ...values, id: item?.id });
        return Promise.resolve();
      }}
    >
      <ProFormText
        label="Address"
        name="address"
        placeholder="Address"
        rules={[{ required: true, message: "Address!" }]}
      />
    </MyModalForm>
  );
};
