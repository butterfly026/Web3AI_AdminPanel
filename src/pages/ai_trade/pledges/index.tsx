import {
  MyColumns,
  MyEnumFormSelect,
  MyPagination,
  processYesOrNo,
  useListPage,
} from "@/common";
import XSelect from "@/components/XSelect";
import { PledgesStatusEnum, YesOrNoEnum } from "@/enums";
import { ProCard, ProFormText, QueryFilter } from "@ant-design/pro-components";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { useParams } from "umi";

export default () => {
  const params_url = useParams();
  const { modalRef, actions, params, pagination, search, table } = useListPage({
    baseUri: "pledges",
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
      MyColumns.address({
        title: "user address",
        key1: "user",
        key2: "address",
      }),
      MyColumns.enumTag({
        title: "IsTrail",
        items: YesOrNoEnum,
        key1: "is_trail",
        process: processYesOrNo,
      }),
      MyColumns.coin({ title: "Staking", key1: "staking" }),
      MyColumns.coin({
        title: "Earnings This Node",
        key1: "earnings_this_node",
        after: " x",
      }),
      MyColumns.coin({ title: "Earnings Today", key1: "earnings_today" }),
      MyColumns.dateTime({
        title: "Start At",
        key1: "started_at",
        relative: true,
        relativeType: true,
      }),
      MyColumns.dateTime({
        title: "End At",
        key1: "ended_at",
        relative: true,
        relativeType: true,
      }),
      MyColumns.enumTag({
        title: "Status",
        key1: "status",
        items: PledgesStatusEnum,
      }),
    ] as ProColumns<any, "text">[],
    toolBarRender: () => [],
  };

  return (
    <>
      <PageContainer
        title="Plan Management"
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
                name="is_trail"
                label="is_trail"
                items={YesOrNoEnum}
              />
              <MyEnumFormSelect
                name="status"
                label="status"
                items={PledgesStatusEnum}
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
