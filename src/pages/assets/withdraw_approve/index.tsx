import {
  getDataFromParams,
  MyButtons,
  MyColumns,
  MyEnumFormSelect,
  MyPagination,
  processYesOrNo,
  useListPage,
} from "@/common";
import XSelect from "@/components/XSelect";
import {
  AssetsPendingStatusEnum,
  AssetsPendingTypeEnum,
  Web3NetworkEnum,
  YesOrNoEnum,
} from "@/enums";
import { ProCard } from "@ant-design/pro-components";
import { ProFormText, QueryFilter } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { message } from "antd";
import { request } from "umi";
import { Update } from "./modals/Update";

export default () => {
  const { actions, params, pagination, search, table, setResData, modalRef } =
    useListPage({
      baseUri: "assets",
      defaultParams: { s: { is_demo_user: 0 } },
      otherApi: {
        list: () => {
          request(
            "assets/withdraw_approve_list",
            getDataFromParams(params)
          ).then((res: any) => {
            modalRef.current?.hideModal();
            setResData(res);
          });
        },
        approve: (id: number) => {
          request("assets/confirm_withdraw", { data: { id } }).then(
            (res: any) => {
              message.success("Success");
              actions.list();
            }
          );
        },
      },
    });

  const tableProps = {
    scroll: { x: "max-content", scrollToFirstRowOnChange: true },
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
      MyColumns.address({ title: "Address", key1: "user", key2: "address" }),
      MyColumns.coin({
        title: "Withdraw",
        key1: "balance",
        precision: 6,
        useCopy: true,
      }),
      MyColumns.coin_network({}),
      MyColumns.coin({ title: "Fee", key1: "pending_fee" }),
      MyColumns.eTag({
        title: "Pending Type",
        key1: "pending_type",
        items: AssetsPendingTypeEnum,
      }),
      MyColumns.user({
        title: "Approve User",
        key1: "pending_withdrawal_approve_user",
      }),
      MyColumns.address({
        title: "Approve Address",
        key1: "pending_withdrawal_approve_user",
        key2: "address",
      }),
      MyColumns.eTag({
        title: "Pending Status",
        key1: "pending_status",
        items: AssetsPendingStatusEnum,
      }),
      MyColumns.dateTime({}),
      {
        title: "Operate",
        key: "action",
        align: "right",
        fixed: "right",
        valueType: "option",
        render: (_: any, item: any) => [
          <MyButtons.EditButton
            key={"examine_" + item.id}
            title="Review"
            disabled={item.pending_status != "WAITING"}
            onClick={() => {
              modalRef.current?.showModal({
                title: "Check",
                defaultData: item,
                child: <Update actions={actions} modalRef={modalRef} />,
              });
            }}
          />,
        ],
      },
    ] as ProColumns<any, "text">[],
    toolBarRender: () => [
      // <MyButton.ExportButton actions={actions} params={params?.s} />,
    ],
  };

  return (
    <>
      <PageContainer
        title="Withdraw Approve"
        footer={[<MyPagination key="page" {...pagination} />]}
        content={
          <>
            <ProCard>
              <QueryFilter {...search}>
                <ProFormText name="user_address" label="Address" />
                <XSelect.VipSelect name="user_vips_id" title="UserVIP" />
                <MyEnumFormSelect
                  name="coin_network"
                  label="Network"
                  items={Web3NetworkEnum}
                />
                <MyEnumFormSelect
                  name="is_demo_user"
                  label="Demo"
                  items={YesOrNoEnum}
                />
                <MyEnumFormSelect
                  name="pending_status"
                  label="pending_status"
                  items={AssetsPendingStatusEnum}
                />
              </QueryFilter>
              <ProTable
                {...table}
                {...tableProps}
                expandable={{ defaultExpandAllRows: true }}
              />
            </ProCard>
          </>
        }
      />
    </>
  );
};
