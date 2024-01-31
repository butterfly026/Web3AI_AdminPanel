import { MyButtons, MyColumns, MyPagination, useListPage } from "@/common";
import { MyEnumFormSelect } from "@/common/components/MyEnumFormSelect";
import { UsersIdentityStatusEnum, UsersStatusEnum, YesOrNoEnum } from "@/enums";
import { UserOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { ProFormText, QueryFilter } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Avatar, Space, Typography } from "antd";
import { history, useParams } from "umi";

export default () => {
  const uparams = useParams();

  // const { modalRef, actions, columns, pagination, search, table, styles } =
  //   useListPage({
  //     baseUri: "jackpot_logs",
  //     defaultParams: { jackpots_id: params.id },
  //   });

  const { modalRef, actions, params, pagination, search, table } = useListPage({
    baseUri: "jackpot_logs",
    defaultParams: { s: { profile_status: uparams.id } },
  });

  const tableProps = {
    scroll: { x: "max-content", scrollToFirstRowOnChange: true },
    columns: [
      MyColumns.id,
      {
        title: "User",
        render: (_: any, record: any) => (
          <Space>
            <Avatar src={record.avatar} icon={<UserOutlined />} />
            <Typography.Text>{record.nickname ?? "NONAME"}</Typography.Text>
          </Space>
        ),
      },
      MyColumns.address({ title: "address", key1: "address", key2: "user" }),
      {
        title: "user",
        render: (_: any, item: any) => {
          return (
            <Space>
              <Avatar src={item.user?.avatar} />
              <span>{item.user?.full_name}</span>
            </Space>
          );
        },
      },
      {
        title: "profits_id",
        dataIndex: "pledge_profits_id",
      },
      MyColumns.amount({ title: "amount", key1: "amount" }),
    ] as ProColumns<any, "text">[],
    toolBarRender: () => [],
  };

  return (
    <>
      <ProTable
        {...table}
        {...tableProps}
        expandable={{ defaultExpandAllRows: true }}
      />
    </>
  );
};
