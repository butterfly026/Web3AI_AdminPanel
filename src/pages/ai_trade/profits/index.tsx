import {
  MyButtons,
  MyColumns,
  MyEnumFormSelect,
  MyPagination,
  processYesOrNo,
  useListPage,
} from "@/common";
import TransactionDetail from "@/components/TransDetail";
import XSelect from "@/components/XSelect";
import {
  PledgeProfitsDepositStatusEnum,
  PledgeProfitsExchangeStatusEnum,
  PledgeProfitsStakingTypeEnum,
  YesOrNoEnum,
} from "@/enums";
import { showTransactionById } from "@/service/transaction";
import {
  PageContainer,
  ProCard,
  ProColumns,
  ProFormText,
  ProTable,
  QueryFilter,
} from "@ant-design/pro-components";
import { Space, message } from "antd";
import { request } from "umi";
import { AddOneRound } from "./components/AddOneRound";
import { IProfitsList } from "./types";

export default () => {
  const { pagination, search, table, styles, modalRef, actions } = useListPage({
    baseUri: "pledge_profits",
    defaultParams: { s: { is_demo_user: 0 } },
    otherApi: {
      add_one_round: (values: any) => {
        request("pledge_profits/add_one_round", {
          data: values,
        }).then(() => {
          message.success("Success");
          modalRef.current?.hideModal();
          actions.reload();
        });
      },
    },
  });

  const tableProps = {
    columns: [
      MyColumns.id,
      MyColumns.enumTag({
        title: "Demo",
        key1: "user",
        key2: "is_cool_user",
        items: YesOrNoEnum,
        process: processYesOrNo,
      }),
      MyColumns.user({ title: "User", key1: "user" }),
      MyColumns.address({
        title: "UserAddress",
        key1: "user",
        key2: "address",
      }),
      MyColumns.enumTag({
        title: "IsTrail",
        items: YesOrNoEnum,
        key1: "is_trail",
        process: processYesOrNo,
      }),
      MyColumns.enumTag({
        title: "IsNewDay",
        items: YesOrNoEnum,
        key1: "is_new_day",
        process: processYesOrNo,
      }),
      MyColumns.dateTime({ title: "datetime", key1: "datetime" }),
      MyColumns.common({ title: "Round", key1: "round" }),
      MyColumns.coin({ title: "Staking", key1: "staking" }),
      MyColumns.common({
        title: "Durations",
        key1: "duration",
        after: " days",
      }),
      MyColumns.common({ title: "Leverage", key1: "leverage", after: " x" }),
      MyColumns.coin({
        title: "LoseStakingAmount",
        key1: "lose_staking_amount",
      }),
      MyColumns.percent({ title: "Apy", key1: "apy" }),
      MyColumns.percent({ title: "Load Apy", key1: "loan_apy" }),
      MyColumns.percent({ title: "Actual Apy", key1: "actual_apy" }),
      MyColumns.percent({ title: "Actual Loan Apy", key1: "actual_loan_apy" }),
      MyColumns.coin({ title: "Income", key1: "income" }),
      MyColumns.coin({ title: "Actual Income", key1: "actual_income" }),
      MyColumns.coin({ title: "Loyalty Fee", key1: "loyalty_fee" }),
      MyColumns.coin({ title: "Loyalty Amount", key1: "loyalty_amount" }),
      MyColumns.enumTag({
        title: "Auto Exchangable",
        items: YesOrNoEnum,
        key1: "can_automatic_exchange",
        process: processYesOrNo,
      }),
      MyColumns.dateTime({
        title: "Manual Exchange Time",
        key1: "manual_exchanged_at",
      }),
      MyColumns.percent({
        title: "Manual Exchange Fee",
        key1: "manual_exchange_fee_percent",
      }),
      MyColumns.coin({
        title: "Manual Exchange Amount",
        key1: "manual_exchange_fee_amount",
      }),
      MyColumns.enumTag({
        title: "Exchange Status",
        items: PledgeProfitsExchangeStatusEnum,
        key1: "exchange_status",
      }),
      MyColumns.enumTag({
        title: "Cane Profit Guarantee",
        items: YesOrNoEnum,
        key1: "can_profit_guarantee",
        process: processYesOrNo,
      }),
      MyColumns.percent({
        title: "Minimum Guarantee Apy",
        key1: "minimum_guarantee_apy",
      }),
      MyColumns.coin({
        title: "Minimum Guarantee Amount",
        key1: "minimum_guarantee_amount",
      }),
      MyColumns.coin({
        title: "Profit Guarantee Amount",
        key1: "profit_guarantee_amount",
      }),
      MyColumns.enumTag({
        title: "Done Profit Guarantee",
        items: YesOrNoEnum,
        key1: "done_profit_guarantee",
        process: processYesOrNo,
      }),
      MyColumns.coin({
        title: "Deposit Total Amount",
        key1: "deposit_total_amount",
      }),
      MyColumns.coin({
        title: "Deposit Loyalty Amount",
        key1: "deposit_loyalty_amount",
      }),
      MyColumns.coin({
        title: "Deposit Staking Amount",
        key1: "deposit_staking_amount",
      }),
      MyColumns.enumTag({
        title: "Deposit Status",
        items: PledgeProfitsDepositStatusEnum,
        key1: "deposit_status",
      }),
      {
        title: "Action",
        render: (_: any, record: IProfitsList) =>
          record.deposit_web3_transactions_id && (
            <MyButtons.ShowButton
              title={"Web3 Transaction"}
              onClick={() => {
                showTransactionById({
                  id: record.deposit_web3_transactions_id,
                }).then((res) => {
                  modalRef.current?.showModal({
                    title: "Web3 Transaction",
                    defaultData: res.data,
                    child: TransactionDetail(res.data),
                  });
                });
              }}
            />
          ),
      },
      MyColumns.dateTime({ title: "Deposited At", key1: "deposited_at" }),
      MyColumns.enumTag({
        title: "Leveraged Investment",
        items: YesOrNoEnum,
        key1: "can_leveraged_investment",
        process: processYesOrNo,
      }),
      MyColumns.enumTag({
        title: "Automatic Loan Repayment",
        items: YesOrNoEnum,
        key1: "can_automatic_loan_repayment",
        process: processYesOrNo,
      }),
      MyColumns.coin({ title: "Loan Amount", key1: "loan_amount" }),
      MyColumns.percent({ title: "Loan Charges", key1: "loan_charges" }),
      MyColumns.coin({ title: "Loan Charge Fee", key1: "loan_charges_fee" }),
      MyColumns.enumTag({
        title: "Prevent Liquidation",
        items: YesOrNoEnum,
        key1: "can_prevent_liquidation",
        process: processYesOrNo,
      }),
      MyColumns.coin({
        title: "Prevent Liquidation Amount",
        key1: "prevent_liquidation_amount",
      }),
      MyColumns.enumTag({
        title: "Email Notification",
        items: YesOrNoEnum,
        key1: "can_email_notification",
        process: processYesOrNo,
      }),
      MyColumns.enumTag({
        title: "Auto Airdrop Bonus",
        items: YesOrNoEnum,
        key1: "can_automatic_airdrop_bonus",
        process: processYesOrNo,
      }),
      MyColumns.enumTag({
        title: "Auto Staking",
        items: YesOrNoEnum,
        key1: "can_automatic_staking",
        process: processYesOrNo,
      }),
      MyColumns.enumTag({
        title: "Staking Type",
        items: PledgeProfitsStakingTypeEnum,
        key1: "staking_type",
      }),
      MyColumns.enumTag({
        title: "Auto Withdrawal",
        items: YesOrNoEnum,
        key1: "can_automatic_withdrawal",
        process: processYesOrNo,
      }),
      MyColumns.coin({
        title: "Auto Widhdrawal Amount",
        key1: "automatic_withdrawal_amount",
      }),
    ] as ProColumns<any, "text">[],
    toolBarRender: () => [
      // <MyButtons.ExportButton actions={actions} params={params?.s} />,
      <MyButtons.CreateButton
        title="Create No."
        onClick={() => {
          modalRef.current?.showModal({
            title: "Create No.",
            child: <AddOneRound actions={actions} />,
          });
        }}
      />,
    ],
  };

  return (
    <>
      <ProCard {...styles.proCard}>
        <PageContainer
          title="Income Calculation"
          footer={[<MyPagination key="page" {...pagination} />]}
        />
      </ProCard>
      <Space {...styles.space}>
        <ProCard {...styles.proCard}>
          <QueryFilter {...search}>
            <ProFormText name="user_address" label="Address" />
            <MyEnumFormSelect
              name="is_demo_user"
              label="is_demo_user"
              items={YesOrNoEnum}
            />
            <XSelect.VipSelect name="user_vips_id" title="UserVIP" />
            <MyEnumFormSelect
              name="is_trail"
              label="is_trail"
              items={YesOrNoEnum}
            />
          </QueryFilter>
        </ProCard>
        <ProTable {...table} {...tableProps} />
      </Space>
    </>
  );
};
