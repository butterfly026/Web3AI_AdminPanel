import { MyColumns, MyPagination, useListPage } from "@/common";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Table } from "antd";
import { useParams } from "umi";

export default () => {
  const params = useParams();
  const { modalRef, actions, pagination, search, table, styles } = useListPage({
    baseUri: "pledge_profits",
    defaultParams: { users_id: params.id },
  });

  const tableProps = {
    scroll: { x: "max-content", scrollToFirstRowOnChange: true },
    columns: [
      MyColumns.id,
      MyColumns.common({ title: "day" }),
      MyColumns.common({ title: "round" }),
      MyColumns.currency({ title: "staking_before" }),
      MyColumns.currency({ title: "staking_after" }),
      MyColumns.currency({ title: "income_origin" }),
      MyColumns.currency({ title: "income_final" }),
      MyColumns.percent({ title: "apy_origin" }),
      MyColumns.percent({ title: "apy_final" }),
      MyColumns.common({ title: "leverage", after: " x" }),
      MyColumns.percent({ title: "funds_rate" }),
      MyColumns.percent({ title: "funds_apy" }),
      MyColumns.currency({ title: "prevent_liquidation" }),
      MyColumns.currency({ title: "profit_guarantee" }),
      MyColumns.currency({ title: "loan_charges" }),
      MyColumns.currency({ title: "into_loyalty" }),
    ] as ProColumns<any, "text">[],
  };

  return (
    <>
      <ProTable
        {...table}
        {...tableProps}
        expandable={{
          defaultExpandAllRows: true,
          expandedRowRender: (record) => {
            console.log(JSON.parse(record.funds_info_json));
            const columns: any = [
              MyColumns.id,
              MyColumns.currency({ title: "coinPriceBefore" }),
              MyColumns.currency({ title: "coinPriceNow" }),
              MyColumns.currency({ title: "diff" }),
              MyColumns.percent({ title: "coinAPY" }),
              MyColumns.percent({ title: "diffAPY" }),
              MyColumns.percent({ title: "diffRate" }),
              MyColumns.percent({ title: "joinRate" }),
            ];
            return (
              <Table
                rowKey="id"
                columns={columns}
                dataSource={JSON.parse(record.funds_info_json)?.["items"] ?? []}
                pagination={false}
              />
            );
          },
          // <Table columns={columns} dataSource={data} pagination={false} />
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
        pagination={<MyPagination key="page" {...pagination} />}
      />
    </>
  );
};
