import {
  MyColumns,
  MyEnumFormSelect,
  MyPagination,
  processYesOrNo,
  useListPage,
} from "@/common";
import XSelect from "@/components/XSelect";
import { AssetsTypeEnum, YesOrNoEnum } from "@/enums";
import { ProCard } from "@ant-design/pro-components";
import { ProFormText, QueryFilter } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";

export default () => {
  const { actions, params, pagination, search, table, setResData, modalRef } =
    useListPage({
      baseUri: "asset_logs",
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
      MyColumns.enumTag({
        title: "Type",
        key1: "type",
        items: AssetsTypeEnum,
      }),
      MyColumns.coin({
        title: "Before",
        key1: "before",
      }),
      MyColumns.coin({
        title: "Amount",
        key1: "amount",
      }),
      MyColumns.coin({
        title: "After",
        key1: "after",
      }),
      MyColumns.common({
        title: "Remark",
        key1: "remark",
      }),
      MyColumns.common({
        title: "Reason",
        key1: "reason",
      }),
      MyColumns.dateTime({ sorter: true }),
    ] as ProColumns<any, "text">[],
    toolBarRender: () => [
      // <MyButton.ExportButton actions={actions} params={params?.s} />,
    ],
  };

  return (
    <>
      <PageContainer
        title="Withdrawable"
        footer={[<MyPagination key="page" {...pagination} />]}
        content={
          <>
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
                  name="type"
                  label="type"
                  items={AssetsTypeEnum}
                />
                <ProFormText name="remark" label="Remark" />
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
