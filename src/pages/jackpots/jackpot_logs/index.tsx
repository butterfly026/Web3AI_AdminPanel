import { MyButtons, MyColumns, MyPagination, useListPage } from "@/common";
import { AirdropStatusEnum } from "@/enums";
import {
  PageContainer,
  ProCard,
  ProColumns,
  ProFormText,
  ProTable,
  QueryFilter,
} from "@ant-design/pro-components";
import { Space } from "antd";

export default () => {
  const { modalRef, actions, params, pagination, search, table } = useListPage({
    baseUri: "jackpot_logs",
  });

  const tableProps = {
    scroll: { x: "max-content", scrollToFirstRowOnChange: true },
    columns: [
      MyColumns.id,
      MyColumns.user({ title: "User" }),
      //   MyColumns.dollar("earnings", "Earnings"),
      //   MyColumns.dollar("airdrop", "Airdrop"),
      MyColumns.common({ title: "Rank" }),
      MyColumns.eTag({
        title: "Status",
        items: AirdropStatusEnum,
      }),
      //   MyColumns.createdAt(),
      // {
      //   title: "操作",
      //   key: "action",
      //   align: "right",
      //   valueType: "option",
      //   render: (_: any, record: any) => [
      //     <MyButton.ShowButton
      //       key={"show_" + record.id}
      //       onClick={() => {
      //         modalRef.current?.showModal({
      //           title: "Show",
      //           defaultData: record,
      //           child: <Show actions={actions} />,
      //         });
      //       }}
      //     />,
      //   ],
      // },
    ] as ProColumns<any, "text">[],
    toolBarRender: () => [],
  };

  return (
    <>
      <PageContainer
        title="PrizePoolLog"
        footer={[<MyPagination key="page" {...pagination} />]}
        content={
          <ProCard>
            <QueryFilter {...search}>
              <ProFormText name="jackpots_id" label="JackpotsID" />
              <ProFormText
                name="jackpot_has_users_id"
                label="JackpotHasUsersID"
              />
              <ProFormText name="address" label="Address" />
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
