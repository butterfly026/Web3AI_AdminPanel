import {
  getDataFromParams,
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
  AssetsPendingStatusEnum,
  AssetsPendingTypeEnum,
  AssetsPendingWithdrawalTypeEnum,
  YesOrNoEnum,
} from "@/enums";
import { showTransactionById } from "@/service/transaction";
import { IAdminAssetsPendings } from "@/types/adminAssetsPendings";
import { ProCard } from "@ant-design/pro-components";
import { ProFormText, QueryFilter } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { request } from "umi";
import ManualStaking from "./components/ManualStaking";

export default () => {
  const { actions, params, pagination, search, table, setResData, modalRef } =
    useListPage({
      baseUri: "assets",
      defaultParams: { s: { is_demo_user: 0 } },
      otherApi: {
        list: () => {
          request("assets/pendings", getDataFromParams(params)).then(
            (res: any) => {
              modalRef.current?.hideModal();
              setResData(res);
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
        title: "Balance",
        align: "right",
        key1: "balance",
        precision: 2,
      }),
      MyColumns.coin({
        title: "PendingFee",
        align: "right",
        key1: "pending_fee",
        precision: 2,
      }),
      MyColumns.eTag({
        title: "PendingType",
        items: AssetsPendingTypeEnum,
        key1: "pending_type",
      }),
      MyColumns.coin({
        title: "RewardLoyalty",
        align: "right",
        key1: "reward_loyalty_amount",
        precision: 2,
      }),
      MyColumns.eTag({
        title: "PendingWithdraw",
        items: AssetsPendingWithdrawalTypeEnum,
        key1: "pending_withdrawal_type",
      }),
      MyColumns.eTag({
        title: "PendingStatus",
        items: AssetsPendingStatusEnum,
        key1: "pending_status",
      }),
      {
        title: "Action",
        render: (_: any, record: IAdminAssetsPendings) => {
          return (
            <>
              {record.web3_transactions_id && (
                <MyButtons.ShowButton
                  title={"Web3 Transaction"}
                  onClick={() => {
                    showTransactionById({
                      id: record.web3_transactions_id,
                    }).then((res) => {
                      console.log(res);
                      modalRef.current?.showModal({
                        title: "Web3 Transaction",
                        defaultData: res.data,
                        child: TransactionDetail(res.data),
                      });
                    });
                  }}
                />
              )}
            </>
          );
        },
      },
    ] as ProColumns<any, "text">[],
  };

  const toolBarRender = () => {
    return [
      <MyButtons.EditButton
        key="add"
        title="Manual Staking"
        onClick={() => {
          modalRef.current?.showModal({
            title: "Manual Staking",
            defaultData: {},
            child: <ManualStaking onClose={modalRef.current.hideModal} />,
          });
        }}
      />,
    ];
  };

  return (
    <>
      <PageContainer
        title="Pendings"
        footer={[<MyPagination key="page" {...pagination} />]}
        content={
          <>
            <ProCard>
              <QueryFilter {...search}>
                <ProFormText name="user_address" label="Address" />
                <XSelect.VipSelect name="user_vips_id" title="UserVIP" />
                <MyEnumFormSelect
                  name="is_demo_user"
                  label="Demo"
                  items={YesOrNoEnum}
                />
                <MyEnumFormSelect
                  name="pending_type"
                  label="pending_type"
                  items={AssetsPendingTypeEnum}
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
                toolBarRender={toolBarRender}
                expandable={{ defaultExpandAllRows: true }}
              />
            </ProCard>
          </>
        }
      />
    </>
  );
};
