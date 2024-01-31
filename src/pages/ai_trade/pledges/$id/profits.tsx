import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Table } from "antd";
import { useParams } from "umi";
import { MyButtons, MyColumns, MyPagination, useListPage } from "@/common";

export default () => {
  const params = useParams();
  const { pagination, table } = useListPage({
    baseUri: "pledge_profits",
    defaultParams: { pledges_id: params.id },
  });

  const tableProps = {
    scroll: { x: "max-content", scrollToFirstRowOnChange: true },
    columns: [
      MyColumns.id,
      MyColumns.common({ title: "day" }),
      MyColumns.common({ title: "round" }),
      MyColumns.amount({ title: "staking_before", key1: "staking_before" }),
      MyColumns.amount({ title: "staking_after", key1: "staking_after" }),
      MyColumns.amount({ title: "income_origin", key1: "income_origin" }),
      MyColumns.amount({ title: "income_final", key1: "income_final" }),
      MyColumns.percent({ title: "apy_origin", key1: "apy_origin" }),
      MyColumns.percent({ title: "apy_final" }),
      MyColumns.common({ title: "leverage", after: " x" }),
      MyColumns.percent({ title: "funds_rate" }),
      MyColumns.percent({ title: "funds_apy" }),
      MyColumns.amount({ title: "prevent_liquidation" }),
      MyColumns.amount({ title: "profit_guarantee" }),
      MyColumns.amount({ title: "loan_charges" }),
      MyColumns.amount({ title: "into_loyalty" }),
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
            console.log(JSON.parse(record.funds_detail_json));
            const columns: any = [
              MyColumns.id,
              MyColumns.amount({ title: "coinPriceBefore" }),
              MyColumns.amount({ title: "coinPriceNow" }),
              MyColumns.amount({ title: "diff" }),
              MyColumns.percent({ title: "coinAPY" }),
              MyColumns.percent({ title: "diffAPY" }),
              MyColumns.percent({ title: "diffRate" }),
              MyColumns.percent({ title: "joinRate" }),
            ];
            return (
              <Table
                rowKey="id"
                columns={columns}
                dataSource={
                  JSON.parse(record.funds_detail_json)?.["items"] ?? []
                }
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
