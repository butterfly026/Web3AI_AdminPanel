import {
  MyColumns,
  MyEnumFormSelect,
  MyPagination,
  useListPage,
} from "@/common";
import { Web3TransactionsStatusEnum, Web3TransactionsTypeEnum } from "@/enums";
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
    baseUri: "web3_transactions",
  });

  const tableProps = {
    scroll: { x: "max-content", scrollToFirstRowOnChange: true },
    columns: [
      MyColumns.id,
      MyColumns.user({ title: "User", key1: "user" }),
      MyColumns.coinIcon({ title: "Coin", key1: "coin" }),
      MyColumns.eTag({
        title: "Type",
        items: Web3TransactionsTypeEnum,
        key1: "type",
      }),
      MyColumns.common({ title: "Coin Network", key1: "coin_network" }),
      MyColumns.common({ title: "Coin Symbol", key1: "coin_symbol" }),
      MyColumns.coin({ title: "Coin Amount", key1: "coin_amount" }),
      MyColumns.currency({ title: "Usd Price", key1: "usd_price" }),
      MyColumns.address({ title: "From Address", key1: "from_address" }),
      MyColumns.address({ title: "To Address", key1: "to_address" }),
      MyColumns.address({ title: "Hash", key1: "hash" }),
      MyColumns.common({ title: "Block Number", key1: "block_number" }),
      MyColumns.common({ title: "Message", key1: "message" }),
      MyColumns.eTag({
        title: "Status",
        items: Web3TransactionsStatusEnum,
        key1: "status",
      }),
    ] as ProColumns<any, "text">[],
    toolBarRender: () => [],
  };

  return (
    <>
      <PageContainer
        title="web3交易"
        footer={[<MyPagination key="page" {...pagination} />]}
        content={
          <ProCard>
            <QueryFilter {...search}>
              <ProFormText name="from_address" label="From Address" />
              <ProFormText name="to_address" label="To Address" />
              <ProFormText name="coin_symbol" label="Coin Symbol" />
              <MyEnumFormSelect
                name="type"
                label={"Type"}
                items={Web3TransactionsTypeEnum}
              />
              <ProFormText name="hash" label="Hash" />
              <MyEnumFormSelect
                name="status"
                label={"Status"}
                items={Web3TransactionsStatusEnum}
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
