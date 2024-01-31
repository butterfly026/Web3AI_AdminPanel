import XMessage from "@/components/XMessage";
import {
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormInstance,
} from "@ant-design/pro-components";
import { Space } from "antd";
import { useEffect, useRef } from "react";
import { request } from "umi";

export default function GiftConfig() {
  const formRef = useRef<ProFormInstance<any>>();

  useEffect(() => {
    request("configs/get", { data: { key: "gift" } }).then((res) => {
      console.log("res", res);
      formRef?.current?.setFieldsValue(res.data);
    });
  }, []);

  return (
    <Space
      style={{
        marginTop: "1rem",
        padding: "30px 20px 20px 20px",
      }}
    >
      <ProCard direction="column" title="GiftSetting" bordered headerBordered>
        <ProForm
          formRef={formRef}
          onFinish={async (e) => {
            console.log(e);
            request("configs/save", {
              data: { key: "gift", value: JSON.stringify(e) },
            }).then(() => {
              XMessage.success({ key: "Ok" });
            });
          }}
          layout="horizontal"
        >
          <ProFormDigit name="min" label="MinimumExchangeQuantity" />
          <ProFormDigit name="fee" label="Fee%" />
        </ProForm>
      </ProCard>
    </Space>
  );
}
