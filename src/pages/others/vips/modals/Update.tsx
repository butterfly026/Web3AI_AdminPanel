import { MyModalDataContext, MyModalForm } from '@/common';
import XSelect from '@/components/XSelect';
import { useContext, useEffect, useRef } from 'react';
import {
  ProFormInstance,
  ProFormText,
  ProFormSwitch,
  ProFormDigit,
} from '@ant-design/pro-components';
import { Col, Divider, Row } from 'antd';

export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    console.log('update item', item);
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
        label='Name'
        name='name'
        placeholder='Name'
        rules={[{ required: true, message: 'Name！' }]}
      />

      <ProFormDigit
        label='NeedStake'
        name='need_stake'
        placeholder='NeedStake'
        addonAfter='USDC'
        rules={[{ required: true, message: 'NeedStake!' }]}
      />
      <Divider>Ai trade</Divider>
      <Row>
        <Col span={24}>
          <ProFormSwitch name='can_automatic_trade' label='CanAutomaticTrade' />
        </Col>
        <Col span={24}>
          <ProFormSwitch name='can_trail_bonus' label='CanTrailBonus' />
        </Col>
        <Col span={24}>
          <ProFormSwitch
            name='can_automatic_exchange'
            label='CanAutomaticExchange'
          />
        </Col>
        <Col span={24}>
          <ProFormSwitch
            name='can_email_notification'
            label='CanEmailNotification'
          />
        </Col>
        <Col span={24}>
          <ProFormSwitch
            name='can_leveraged_investment'
            label='CanLeveragedInvestment'
          />
        </Col>
        <Col span={24}>
          <ProFormSwitch
            name='can_automatic_loan_repayment'
            label='CanAutomaticLoanRepayment'
          />
        </Col>
        <Col span={24}>
          <ProFormSwitch
            name='can_prevent_liquidation'
            label='CanPreventLiquidation'
          />
        </Col>
        <Col span={24}>
          <ProFormSwitch
            name='can_profit_guarantee'
            label='CanProfitGuarantee'
          />
        </Col>
        <Col span={24}>
          <ProFormSwitch
            name='can_automatic_airdrop_bonus'
            label='CanAutomaticAirdropBonus'
          />
        </Col>
        <Col span={24}>
          <ProFormSwitch
            name='can_automatic_staking'
            label='CanAutomaticStaking'
          />
        </Col>
        <Col span={24}>
          <ProFormSwitch
            name='can_automatic_withdrawal'
            label='CanAutomaticWithdrawal'
          />
        </Col>
      </Row>
      <Divider>Referral Privilege</Divider>
      <ProFormText
        label='DailyReferralRewards'
        name='daily_referral_rewards'
        rules={[{ required: true }]}
      />

      <ProFormDigit
        label='Level1'
        name='level_1_refer'
        placeholder='Level_1'
        rules={[{ required: true, message: 'Level_1!' }]}
      />

      <ProFormDigit
        label='Level2'
        name='level_2_refer'
        placeholder='Level_2'
        rules={[{ required: true, message: 'Level_2!' }]}
      />

      <ProFormDigit
        label='Level_3'
        name='level_3_refer'
        placeholder='Level_3'
        rules={[{ required: true, message: 'Level_3!' }]}
      />

      <ProFormText
        label='LeveragedInvestment'
        name='leveraged_investment'
        placeholder='LeveragedInvestment'
        rules={[{ required: true, message: 'LeveragedInvestment！' }]}
      />

      <ProFormDigit
        label='LoanCharges'
        name='loan_charges'
        placeholder='loan_charges'
        rules={[{ required: true, message: 'LoanCharges！' }]}
      />

      <ProFormDigit
        label='MinimumApyGuarantee'
        name='minimum_apy_guarantee'
        max={100}
        placeholder='MinimumApyGuarantee'
        rules={[{ required: true, message: 'MinimumApyGuarantee！' }]}
      />

      <ProFormDigit
        label='MinimumWithdrawalLimit'
        name='minimum_withdrawal_limit'
        max={100}
        placeholder='MinimumWithdrawalLimit'
        rules={[{ required: true, message: 'MinimumWithdrawalLimit！' }]}
      />

      <ProFormDigit
        label='MaximumWithdrawalLimit'
        name='maximum_withdrawal_limit'
        max={100}
        placeholder='MaximumWithdrawalLimit'
        rules={[{ required: true, message: 'MaximumWithdrawalLimit！' }]}
      />

      <ProFormText
        name='number_of_withdrawals'
        label='NumberOfWithdrawals'
        placeholder='NumberOfWithdrawals'
        rules={[{ required: true, message: 'NumberOfWithdrawals！' }]}
      />

      <ProFormText
        label='WithdrawalTime'
        name='withdrawal_time'
        placeholder='WithdrawalTime'
        rules={[{ required: true, message: 'WithdrawalTime！' }]}
      />

      <ProFormDigit
        name='network_fee'
        label='NetworkFee'
        placeholder='NetworkFee'
        rules={[{ required: true, message: 'NetworkFee！' }]}
      />

      <ProFormDigit
        name='need_withdrawal_verification'
        label='NeedWithdrawalVerification'
        placeholder='NeedWithdrawalVerification'
        rules={[{ required: true, message: 'NeedWithdrawalVerification！' }]}
      />

      <ProFormSwitch name='can_pm_friends' label='CanPmFriends' />

      <ProFormSwitch
        name='can_customize_online_status'
        label='CanCustomizeOnlineStatus'
      />

      <ProFormSwitch
        name='can_view_contact_details'
        label='CanViewContactDetails'
      />
      <ProFormSwitch name='can_send_gift' label='CanSendGift' />

      <ProFormSwitch
        name='can_promotion_first_notice'
        label='CanPromotionFirstNotice'
      />

      <ProFormSwitch
        name='can_exclusive_customer_service'
        label='CanExclusiveCustomerService'
      />
    </MyModalForm>
  );
};
