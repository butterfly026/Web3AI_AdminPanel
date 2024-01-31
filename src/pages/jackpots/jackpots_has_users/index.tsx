import {
  MyColumns,
  MyEnumFormSelect,
  MyPagination,
  processYesOrNo,
  useListPage,
} from "@/common";
import XSelect from "@/components/XSelect";
import { AirdropStatusEnum, YesOrNoEnum } from "@/enums";
import {
  PageContainer,
  ProCard,
  ProColumns,
  ProFormText,
  ProTable,
  QueryFilter,
} from "@ant-design/pro-components";

export default () => {
  const { modalRef, actions, params, pagination, search, table } = useListPage({
    baseUri: "jackpots_has_users",
    defaultParams: { s: { is_demo_user: 0 } },
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
      MyColumns.coin({ title: "Loyalty", key1: "loyalty" }),
      MyColumns.coin({ title: "Airdrop", key1: "airdrop" }),
      MyColumns.common({ title: "Rank", key1: "rank" }),
      MyColumns.enumTag({
        title: "AutomaticAirdropBonus",
        key1: "can_automatic_airdrop_bonus",
        items: YesOrNoEnum,
        process: processYesOrNo,
      }),
      MyColumns.enumTag({
        title: "Status",
        key1: "status",
        items: AirdropStatusEnum,
      }),
    ] as ProColumns<any, "text">[],
    toolBarRender: () => [],
  };

  return (
    <>
      <PageContainer
        title="UserLoyalty"
        footer={[<MyPagination key="page" {...pagination} />]}
        content={
          <ProCard>
            <QueryFilter {...search}>
              <ProFormText name="user_address" label="Address" />
              <MyEnumFormSelect
                name="is_demo_user"
                label="is_demo_user"
                items={YesOrNoEnum}
              />
              <XSelect.VipSelect name="user_vips_id" title="UserVIP" />
              <MyEnumFormSelect
                name="can_automatic_airdrop_bonus"
                label="can_automatic_airdrop_bonus"
                items={YesOrNoEnum}
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
