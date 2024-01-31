import { MyModalDataContext, MyModalForm } from "@/common";
import XSelect from "@/components/XSelect";
import { ProFormInstance, ProFormSwitch } from "@ant-design/pro-components";
import { useContext, useEffect, useRef } from "react";

const switchList = [
  {name: "Automatic Trade", key: "can_automatic_trade"},
  {name: "Trail Bonus", key: "can_trail_bonus"},
  {name: "Automatic Exchange", key: "can_automatic_exchange"},
  {name: "Profit Guarantee", key: "can_profit_guarantee"},
  {name: "Leveraged Investment", key: "can_leveraged_investment"},
  {name: "Automatic Loan Repayment", key: "can_automatic_loan_repayment"},
  {name: "Liquidation protection", key: "can_prevent_liquidation"},
  {name: "E-mail Notification", key: "can_email_notification"},
  {name: "Automatic Airdrop Bonus", key: "can_automatic_airdrop_bonus"},
  {name: "Automatic Staking", key: "can_automatic_staking"},
  {name: "Automatic Withdrawal", key: "can_automatic_withdrawal"},
];
export default function ShowSwitch(props: any) {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    formRef?.current?.setFieldsValue(item);
  }, [item]);

  return (
    <>
      <MyModalForm
        formRef={formRef}
        submitter={false}
        labelCol={{ sm: { span: 8 } }}
        wrapperCol={{ sm: { span: 12 } }}
      >
        <div style={{ paddingLeft: "4rem" }}>
          {switchList?.map((res) => {
            return (
              <ProFormSwitch key={res.key} disabled name={res?.key} label={res.name} />
            );
          })}

          <XSelect.LeverageSelect disabled initialValues={{leverage: item?.leverage}} />
          <XSelect.DurationSelect disabled initialValues={{duration: item?.duration}}/>
        </div>
      </MyModalForm>
    </>
  );
}
