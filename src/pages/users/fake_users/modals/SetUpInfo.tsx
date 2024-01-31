import { MyModalDataContext, MyModalForm } from "@/common";
import { ProFormInstance } from "@ant-design/pro-components";
import { message } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { request } from "umi";
import FormSwitch from "../components/formswitch";
import XSelect from "@/components/XSelect";
import {
  WithdrawalOpt,
  LiquidationOpt,
} from "../../../../common/utils/optionsSelect";

const switchList: any = [
  { key: "can_automatic_trade", value: false },
  { key: "can_trail_bonus", value: false },
  { key: "can_automatic_exchange", value: false },
  { key: "can_profit_guarantee", value: false },
  { key: "can_leveraged_investment", value: false },
  { key: "can_automatic_loan_repayment", value: false },
  {
    key: "can_prevent_liquidation",
    value: false,
    placeholder: "Please set the protection amount",
    input: true,
    options: LiquidationOpt,
    data: { prevent_liquidation_amount: 0 },
  },
  { key: "can_email_notification", value: false },
  { key: "can_automatic_airdrop_bonus", value: false },
  {
    key: "can_automatic_staking",
    value: false,
    data: { staking_type: "IsolatedMargin" },
  },
  {
    key: "can_automatic_withdrawal",
    value: false,
    placeholder: "Please set the automatic withdrawal amount",
    input: true,
    options: WithdrawalOpt,
    data: { automatic_withdrawal_amount: 0 },
  },
];
export default function SetUpInfo(props: any) {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);
  const [switchItem, setSwitchItem] = useState([]);

  useEffect(() => {
    request("fake_users/user_show", {
      data: { id: item?.id },
    }).then((res) => {
      for (let key in res?.data) {
        switchList?.map((json: any) => {
          if (key == json?.key) {
            json.value = res?.data[key] ? true : false;
          }
        });
      }
      setSwitchItem(switchList);
      formRef?.current?.setFieldsValue(res?.data);
    });
  }, [item]);
  return (
    <>
      <div style={{ paddingLeft: "6rem" }}>
        {switchItem?.map((res: any, index: number) => {
          return (
            <FormSwitch
              name={res?.key}
              label={res?.key}
              checked={res?.value}
              data={res?.data}
              key={`${res?.key}_${index}`}
              placeholder={res?.placeholder}
              input={res?.input}
              options={res?.options}
              values={{ key: res?.key, id: item?.id }}
            />
          );
        })}
      </div>

      <MyModalForm formRef={formRef} submitter={false}>
        <XSelect.LeverageSelect
          fieldProps={{
            onChange: (e: any) => {
              request("fake_users/user_update_leverage", {
                data: { id: item?.id, leverage: e },
              }).then(() => {
                message.success("Success");
              });
            },
          }}
        />
        <XSelect.DurationSelect
          fieldProps={{
            onChange: (e: any) => {
              request("fake_users/update_max_staking_day", {
                data: { id: item?.id, duration: e },
              }).then(() => {
                message.success("Success");
              });
            },
          }}
        />
      </MyModalForm>
    </>
  );
}
