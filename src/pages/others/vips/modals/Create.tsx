import { MyModalForm } from "@/common";
import XSelect from "@/components/XSelect";
import { useEffect, useRef } from "react";
import {
  ProFormText,
  ProFormSwitch,
  ProFormDigit,
  ProFormInstance,
} from "@ant-design/pro-components";
import { Switch, Card, Descriptions } from "antd";

export const Create = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();

  useEffect(() => {
    formRef?.current?.setFieldsValue({
      can_promotion_first_notice: false,
      can_send_gift: false,
      can_view_contact_details: false,
      can_customize_online_status: false,
      can_pm_friends: false,
      can_automatic_withdrawal: false,
      can_automatic_staking: false,
      can_automatic_airdrop_bonus: false,
      can_profit_guarantee: false,
      can_prevent_liquidation: false,
      can_automatic_loan_repayment: false,
      can_leveraged_investment: false,
      can_email_notification: false,
      can_automatic_exchange: false,
      can_trail_bonus: false,
      can_automatic_trade: false,
      can_exclusive_customer_service: false,
    });
  }, []);
  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        console.log(values, "values");
        props.actions?.store(values);
        return Promise.resolve();
      }}
    >
      <ProFormText
        label="Name"
        name="name"
        placeholder="Name"
        rules={[{ required: true, message: "Name！" }]}
      />

      <ProFormDigit
        label="NeedStake"
        name="need_stake"
        placeholder="NeedStake"
        rules={[{ required: true, message: "NeedStake!" }]}
      />

      <ProFormText
        label="DailyReferralRewards"
        name="daily_referral_rewards"
        placeholder="DailyReferralRewards"
        rules={[{ required: true, message: "DailyReferralRewards!" }]}
      />

      <ProFormDigit
        label="Level1"
        name="level_1_refer"
        placeholder="Level_1"
        rules={[{ required: true, message: "Level_1!" }]}
      />

      <ProFormDigit
        label="Level2"
        name="level_2_refer"
        placeholder="Level_2"
        rules={[{ required: true, message: "Level_2!" }]}
      />

      <ProFormDigit
        label="Level3"
        name="level_3_refer"
        placeholder="Level_3"
        rules={[{ required: true, message: "Level_3!" }]}
      />

      <ProFormText
        label="LeveragedInvestment"
        name="leveraged_investment"
        placeholder="LeveragedInvestment"
        rules={[{ required: true, message: "LeveragedInvestment！" }]}
      />

      <ProFormDigit
        label="LoanCharges"
        name="loan_charges"
        placeholder="loan_charges"
        rules={[{ required: true, message: "LoanCharges！" }]}
      />

      <ProFormDigit
        label="MinimumApyGuarantee"
        name="minimum_apy_guarantee"
        max={100}
        placeholder="MinimumApyGuarantee"
        rules={[{ required: true, message: "MinimumApyGuarantee！" }]}
      />

      <ProFormDigit
        label="MinimumWithdrawalLimit"
        name="minimum_withdrawal_limit"
        max={100}
        placeholder="MinimumWithdrawalLimit"
        rules={[{ required: true, message: "MinimumWithdrawalLimit！" }]}
      />

      <ProFormDigit
        label="MaximumWithdrawalLimit"
        name="maximum_withdrawal_limit"
        max={100}
        placeholder="MaximumWithdrawalLimit"
        rules={[{ required: true, message: "MaximumWithdrawalLimit！" }]}
      />

      <ProFormText
        name="number_of_withdrawals"
        label="NumberOfWithdrawals"
        placeholder="NumberOfWithdrawals"
        rules={[{ required: true, message: "NumberOfWithdrawals！" }]}
      />

      <ProFormText
        label="WithdrawalTime"
        name="withdrawal_time"
        placeholder="WithdrawalTime"
        rules={[{ required: true, message: "WithdrawalTime！" }]}
      />

      <ProFormDigit
        name="NetworkFee"
        label="NetworkFee"
        placeholder="NetworkFee"
        rules={[{ required: true, message: "NetworkFee！" }]}
      />

      <ProFormDigit
        name="NeedWithdrawalVerification"
        label="NeedWithdrawalVerification"
        placeholder="NeedWithdrawalVerification"
        rules={[{ required: true, message: "NeedWithdrawalVerification！" }]}
      />

      <ProFormSwitch
        name="can_prevent_liquidation"
        label="CanPreventLiquidation"
      />

      <ProFormSwitch name="can_automatic_trade" label="CanAutomaticTrade" />

      <ProFormSwitch name="can_trail_bonus" label="CanTrailBonus" />

      <ProFormSwitch
        name="can_automatic_exchange"
        label="CanAutomaticExchange"
      />

      <ProFormSwitch
        name="can_email_notification"
        label="CanEmailNotification"
      />

      <ProFormSwitch
        name="can_leveraged_investment"
        label="CanLeveragedInvestment"
      />

      <ProFormSwitch
        name="can_automatic_loan_repayment"
        label="CanAutomaticLoanRepayment"
      />

      <ProFormSwitch name="can_profit_guarantee" label="CanProfitGuarantee" />

      <ProFormSwitch
        name="can_automatic_airdrop_bonus"
        label="CanAutomaticAirdropBonus"
      />
      <ProFormSwitch name="can_automatic_staking" label="CanAutomaticStaking" />

      <ProFormSwitch
        name="can_automatic_withdrawal"
        label="CanAutomaticWithdrawal"
      />

      <ProFormSwitch name="can_pm_friends" label="CanPmFriends" />

      <ProFormSwitch
        name="can_customize_online_status"
        label="CanCustomizeOnlineStatus"
      />

      <ProFormSwitch
        name="can_view_contact_details"
        label="CanViewContactDetails"
      />
      <ProFormSwitch name="can_send_gift" label="CanSendGift" />

      <ProFormSwitch
        name="can_promotion_first_notice"
        label="CanPromotionFirstNotice"
      />

      <ProFormSwitch
        name="can_exclusive_customer_service"
        label="CanExclusiveCustomerService"
      />
    </MyModalForm>
  );
};
