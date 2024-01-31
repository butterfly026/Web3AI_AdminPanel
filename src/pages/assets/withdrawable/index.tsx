import {
  MyColumns,
  MyEnumFormSelect,
  MyPagination,
  getDataFromParams,
  processYesOrNo,
  useListPage,
} from "@/common";
import XSelect from "@/components/XSelect";
import { YesOrNoEnum } from "@/enums";
import { ProCard } from "@ant-design/pro-components";
import { ProFormText, QueryFilter } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { request } from "umi";

export default () => {
  const { actions, params, pagination, search, table, setResData, modalRef } =
    useListPage({
      baseUri: "assets",
      defaultParams: { s: { is_demo_user: 0 } },
      otherApi: {
        list: () => {
          request("assets/withdrawable", getDataFromParams(params)).then(
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
        key1: "balance",
        align: "right",
        precision: 6,
      }),
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
