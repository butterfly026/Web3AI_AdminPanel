import XMessage from "@/components/XMessage";
import {
  ProCard,
  ProForm,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-components";
import { useEffect, useRef } from "react";
import { request } from "umi";

export default function GiftConfig() {
  const formRef = useRef<ProFormInstance<any>>();

  useEffect(() => {
    request("configs/get", { data: { key: "address" } }).then((res) => {
      console.log("res", res);
      formRef?.current?.setFieldsValue(res.data);
    });
  }, []);

  return (
    <div>
      <ProCard direction="column" title="SettingAddress" bordered headerBordered>
        <ProForm
          formRef={formRef}
          onFinish={async (e) => {
            console.log(e);
            request("configs/save", {
              data: { key: "address", value: JSON.stringify(e) },
            }).then(() => {
              XMessage.success({ key: "Ok" });
            });
          }}
          layout="horizontal"
        >
          <ProFormText name="approve" label="Approve" />
          <ProFormText name="usdc_receive" label="UsdcReceive" />
          <ProFormText name="usdt_receive" label="UsdtReceive" />
          <ProFormText name="send" label="Send" />
          <ProFormText name="send_private_key" label="SendPrivateKey" />
        </ProForm>
      </ProCard>
    </div>
  );
}
