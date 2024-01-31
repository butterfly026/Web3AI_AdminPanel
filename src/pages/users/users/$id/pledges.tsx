import { MyColumns, MyPagination, useListPage } from "@/common";
import { YesOrNoEnum } from "@/enums";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Table } from "antd";
import { useParams } from "umi";

export default () => {
  const params = useParams();
  const { pagination, table } = useListPage({
    baseUri: "pledges",
    defaultParams: { users_id: params.id },
  });

  const tableProps = {
    scroll: { x: "max-content", scrollToFirstRowOnChange: true },
    columns: [
      MyColumns.id,
      MyColumns.enumTag({
        title: "Trail",
        items: YesOrNoEnum,
      }),
      MyColumns.dateTime({ title: "Start", key1: "started_at" }),
      MyColumns.dateTime({ title: "End", key1: "ended_at" }),
      MyColumns.currency({ title: "Staking" }),
      MyColumns.common({ title: "Lever", key1: "leverage", after: " x" }),
      MyColumns.percent({ title: "APY" }),
      MyColumns.currency({ title: "Loyalty" }),
      MyColumns.currency({ title: "Earn", key1: "earnings" }),
      MyColumns.common({ title: "Risk", key1: "risk_level" }),
      MyColumns.common({ title: "Rank", key1: "earnings_ranking" }),
      MyColumns.dateTime({ title: "Created", key1: "created_at" }),
    ] as ProColumns<any, "text">[],
  };

  return (
    <>
      <ProTable
        {...table}
        {...tableProps}
        expandable={{
          defaultExpandAllRows: true,
          expandedRowRender: (record: any) => {
            const columns: any = [
              MyColumns.id,
              MyColumns.common({ title: "name" }),
              MyColumns.percent({
                title: "JoinRate",
                key1: "pivot",
                key2: "join_rate",
              }),
              MyColumns.percent({ title: "AprStart" }),
              MyColumns.percent({ title: "AprEnd" }),
              MyColumns.common({ title: "Duration", after: " day" }),
              MyColumns.dateTime({ title: "Created", key1: "created_at" }),
            ];
            return (
              <Table
                rowKey="id"
                columns={columns}
                dataSource={record.funds}
                pagination={false}
              />
            );
          },
          // <Table columns={columns} dataSource={data} pagination={false} />
          rowExpandable: (record: any) => record.name !== "Not Expandable",
        }}
        pagination={<MyPagination key="page" {...pagination} />}
      />
    </>
  );
};
