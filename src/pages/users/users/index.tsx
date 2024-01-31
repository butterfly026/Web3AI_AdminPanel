import {
  MyButtons,
  MyColumns,
  MyEnumFormSelect,
  MyPagination,
  processYesOrNo,
  useListPage,
} from "@/common";
import XSelect from "@/components/XSelect";
import {
  UsersIdentityStatusEnum,
  UsersStatusEnum,
  YesOrNoAgentEnum,
  YesOrNoEnum,
} from "@/enums";
import { ProCard } from "@ant-design/pro-components";
import { ProFormText, QueryFilter } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { message } from "antd";
import { request } from "umi";
import QueryMessage from "./modals/QueryMessage";
import { SetAgent } from "./modals/SetAgent";
import ShowSwitch from "./modals/ShowSwitch";
import { Update } from "./modals/Update";

export default () => {
  const { modalRef, actions, params, pagination, search, table } = useListPage({
    baseUri: "users",
    defaultParams: { s: { is_cool_user: 0 } },
    otherApi: {
      toggle_can_say: (values: any) => {        
        request("users/toggle_can_say", {
          data: values,
        }).then(() => {
          actions.reload();
        });
      },
      manualOpenNewbie: (values: any) => {
        request("users/manual_open_card", {
          data: values,
        }).then(() => {
          actions.reload();
        });
      },
      setAgent: (values: any) => {
        request("users/update_username_and_password", {
          data: values,
        }).then(() => {
          message.success("Success");
          modalRef.current?.hideModal();
          actions.list();
        });
      },
    },
  });

  // const dataSource = useMemo(() => {
  //   return table.dataSource?.filter((item) => item.is_cool_user == 0);
  // }, [table]);

  const tableProps = {
    columns: [
      MyColumns.id,
      MyColumns.enumTag({
        title: "Demo",
        key1: "is_cool_user",
        items: YesOrNoEnum,
        process: processYesOrNo,
      }),
      MyColumns.user({ title: "User" }),
      MyColumns.common({ title: "InviteCode", key1: "invite_code" }),
      MyColumns.common({ title: "Account Proxy", key1: "username" }),
      MyColumns.enumTag({
        title: "Is Account Proxy",
        key1: "username",
        items: YesOrNoAgentEnum,
        process: (v) =>
          v === null || v === undefined || v === "" ? "No" : "Yes",
      }),
      MyColumns.address({ title: "Address", key1: "address" }),
      MyColumns.common({ title: "Depth", key1: "depth" }),

      MyColumns.user({
        title: "Agent",
        key1: "agent_user",
      }),
      MyColumns.address({
        title: "Parent1",
        key1: "parent_1",
        key2: "address",
      }),
      MyColumns.address({
        title: "Parent2",
        key1: "parent_2",
        key2: "address",
      }),
      MyColumns.coin({ title: "Balance", key1: "total_balance" }),
      MyColumns.address({
        title: "IP",
        key1: "ip",
      }),
      MyColumns.coin({ title: "Locked Balance", key1: "locked_balance" }),
      MyColumns.percent({
        title: "Rate",
        key1: "total_rate",
      }),
      MyColumns.coin({ title: "T-Staking", key1: "total_staking_amount" }),
      MyColumns.coin({ title: "T-Withdraw", key1: "total_withdraw_amount" }),
      MyColumns.coin({ title: "T-Income", key1: "total_income" }),
      MyColumns.coin({ title: "T-Loyalty", key1: "total_loyalty_value" }),
      MyColumns.common({ title: "Referral", key1: "referral_count" }),
      MyColumns.dateTime({
        title: "First staking",
        key1: "first_staking_time",
      }),
      MyColumns.common({ title: "Leverage", key1: "leverage", after: " x" }),
      MyColumns.common({ title: "Duration", key1: "duration" }),
      MyColumns.enumTag({
        title: "Trailed",
        key1: "trailed_at",
        items: YesOrNoEnum,
        process: processYesOrNo,
      }),
      MyColumns.enumTag({
        title: "Email",
        key1: "email_verified_at",
        items: YesOrNoEnum,
        process: processYesOrNo,
      }),
      MyColumns.enumTag({
        title: "Profile",
        key1: "profile_verified_at",
        items: YesOrNoEnum,
        process: processYesOrNo,
      }),
      MyColumns.enumTag({
        title: "Identity",
        key1: "identity_verified_at",
        items: YesOrNoEnum,
        process: processYesOrNo,
      }),
      MyColumns.enumTag({
        title: "Status",
        key1: "status",
        items: UsersStatusEnum,
      }),
      MyColumns.enumTag({
        title: "Newbie",
        key1: "membership_card",
        items: YesOrNoEnum,
        process: processYesOrNo,
      }),
      MyColumns.enumTag({
        title: "FreeFee",
        key1: "first_withdrawal_free",
        items: YesOrNoEnum,
        process: processYesOrNo,
      }),
      MyColumns.enumTag({
        title: "2FA",
        key1: "is_verifiedkey",
        items: YesOrNoEnum,
        process: processYesOrNo,
      }),
      MyColumns.common({ title: "Duration", key1: "duration" }),

      MyColumns.dateTime({}),
      {
        title: "Operate",
        key: "action",
        align: "right",
        fixed: "right",
        valueType: "option",
        render: (_: any, item: any) => [
          <MyButtons.ToggleCanSay
            can_say={item?.can_say}
            key={"ToggleCanSay_" + item.id}
            onConfirm={() => {
              actions?.toggle_can_say({ id: item?.id });
            }}
          />,
          <MyButtons.EditButton
            key={"edit_" + item.id}
            onClick={() => {
              modalRef.current?.showModal({
                title: "Edit",
                defaultData: item,
                child: <Update actions={actions} />,
              });
            }}
          />,
          <MyButtons.EditButton
            key={"open" + item.id}
            title="Newbie"
            onClick={() => {
              actions?.manualOpenNewbie({ id: item?.id });
            }}
          />,
          <MyButtons.EditButton
            key={"set_agent_" + item.id}
            title="Agent"
            onClick={() => {
              modalRef.current?.showModal({
                title: "Set Agent",
                defaultData: item,
                child: <SetAgent actions={actions} />,
              });
            }}
          />,
          <MyButtons.ShowButton
            key={"query_message_" + item.id}
            title="Message"
            onClick={() => {
              modalRef.current?.showModal({
                title: "Check Message",
                defaultData: item,
                child: <QueryMessage actions={actions} />,
              });
            }}
          />,
          <MyButtons.ShowButton
            key={"query_switch_" + item.id}
            title="Switch"
            onClick={() => {
              modalRef.current?.showModal({
                title: "Check Switch",
                defaultData: item,
                child: <ShowSwitch actions={actions} />,
              });
            }}
          />,
        ],
      },
    ] as ProColumns<any, "text">[],
    toolBarRender: () => [
      <MyButtons.ExportButton actions={actions} params={params?.s} />,
    ],
  };

  return (
    <>
      <PageContainer
        title="User Management"
        footer={[<MyPagination key="page" {...pagination} />]}
        content={
          <ProCard>
            <QueryFilter {...search}>
              <ProFormText name="nickname" label="Nick name" />
              <ProFormText name="full_name" label="Full name" />
              <ProFormText name="username" label="Account Proxy" />
              <ProFormText name="address" label="Address" />
              <ProFormText name="parent_address" label="Parent1" />
              <ProFormText name="invite_code" label="InviteCode" />

              <MyEnumFormSelect
                name="trailed"
                label="Trailed"
                items={YesOrNoEnum}
              />
              <MyEnumFormSelect
                name="email_verified"
                label="Email Verified"
                items={YesOrNoEnum}
              />
              <MyEnumFormSelect
                name="profile_status"
                label="Profile Status"
                items={UsersIdentityStatusEnum}
              />
              <MyEnumFormSelect
                name="identity_status"
                label="Identity Status"
                items={UsersIdentityStatusEnum}
              />
              <MyEnumFormSelect
                name="status"
                label="Status"
                items={UsersStatusEnum}
              />
              <XSelect.VipSelect name="user_vips_id" title="UserVIP" />
              <MyEnumFormSelect
                name="is_cool_user"
                label="Demo"
                items={YesOrNoEnum}
              />
              <MyEnumFormSelect
                name="is_account_proxy"
                label="Is Account Proxy"
                items={YesOrNoAgentEnum}
              />
            </QueryFilter>
            <ProTable
              {...table}
              {...tableProps}
              expandable={{ defaultExpandAllRows: true }}
            />
          </ProCard>
        }
      />
    </>
  );
};
