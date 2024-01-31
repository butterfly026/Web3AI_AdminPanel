import XMessage from "@/components/XMessage";
import XSelect from "@/components/XSelect";
import {
  ProCard,
  ProForm,
  ProFormInstance,
  ProFormSwitch,
  ProFormText,
} from "@ant-design/pro-components";
import { useEffect, useRef } from "react";
import { request } from "umi";

export default function GiftConfig() {
  const formRef = useRef<ProFormInstance<any>>();

  useEffect(() => {
    request("configs/get", { data: { key: "trail" } }).then((res) => {
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
              data: { key: "trail", value: JSON.stringify(e) },
            }).then(() => {
              XMessage.success({ key: "Ok" });
            });
          }}
          layout="horizontal"
        >
          <ProFormText name="amount" label="Amount" />
          <ProFormSwitch
            label="CanAutomaticExchange"
            name="can_automatic_exchange"
          />
          <ProFormSwitch
            label="CanLeveragedInvestment"
            name="can_leveraged_investment"
          />
          <ProFormSwitch
            label="CanAutomaticLoanRepayment"
            name="can_automatic_loan_repayment"
          />
          <ProFormSwitch
            label="CanPreventLiquidation"
            name="can_prevent_liquidation"
          />
          <ProFormSwitch
            label="CanProfitGuarantee"
            name="can_profit_guarantee"
          />
          <ProFormSwitch
            label="CanAutomaticAirdropBonus"
            name="can_automatic_airdrop_bonus"
          />
          <ProFormSwitch
            label="CanAutomaticStaking"
            name="can_automatic_staking"
          />
          <ProFormSwitch
            label="CanAutomaticWithdrawal"
            name="can_automatic_withdrawal"
          />
          <ProFormText name="duration" label="Duration" />
          <XSelect.LeverageSelect />
        </ProForm>
      </ProCard>
    </div>
  );
}
