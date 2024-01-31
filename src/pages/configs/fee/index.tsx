import XMessage from "@/components/XMessage";
import {
  ProCard,
  ProForm,
  ProFormText,
  ProFormInstance,
} from "@ant-design/pro-components";
import { Space } from "antd";
import { useEffect, useRef } from "react";
import { request } from "umi";

export default function GiftConfig() {
  const formRef = useRef<ProFormInstance<any>>();

  useEffect(() => {
    request("configs/get", { data: { key: "fee" } }).then((res) => {
      console.log("res", res);
      formRef?.current?.setFieldsValue(res.data);
    });
  }, []);

  return (
    <div>
      <ProCard direction="column" title="Fee Setting" bordered headerBordered>
        <ProForm
          formRef={formRef}
          onFinish={async (e) => {
            console.log(e);
            request("configs/save", {
              data: { key: "fee", value: JSON.stringify(e) },
            }).then(() => {
              XMessage.success({ key: "Ok" });
            });
          }}
          layout="horizontal"
        >
          <ProFormText name="withdraw_base_fee" label="WithdrawBaseFee" />
        </ProForm>
      </ProCard>
    </div>
  );
}
