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
    request("configs/get", { data: { key: "other" } }).then((res) => {
      console.log("res", res);
      formRef?.current?.setFieldsValue(res.data);
    });
  }, []);

  return (
    <div>
      <ProCard direction="column" title="OtherSetting" bordered headerBordered>
        <ProForm
          formRef={formRef}
          onFinish={async (e) => {
            console.log(e);
            request("configs/save", {
              data: { key: "other", value: JSON.stringify(e) },
            }).then(() => {
              XMessage.success({ key: "Ok" });
            });
          }}
          layout="horizontal"
        >
          <ProFormText name="min_staking" label="MinStaking" />
          <ProFormText name="jackpot_goal_amount" label="JackpotGoalAmount" />
          <ProFormText
            name="jackpot_send_airdrop_amount"
            label="JackpotSendAirdropAmount"
          />
        </ProForm>
      </ProCard>
    </div>
  );
}
