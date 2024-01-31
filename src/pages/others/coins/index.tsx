import {MyButtons, MyColumns, MyPagination, useListPage} from "@/common";
import {ProCard} from "@ant-design/pro-components";
import {ProFormText, QueryFilter} from "@ant-design/pro-form";
import {PageContainer} from "@ant-design/pro-layout";
import type {ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {Typography, Avatar, Space} from "antd";

export default () => {
    const {modalRef, actions, params, pagination, search, table} = useListPage({
        baseUri: "coins",
    });

    const tableProps = {
        scroll: {x: "max-content", scrollToFirstRowOnChange: true},
        columns: [
            MyColumns.id,
            {
                title: "Icon",
                dataIndex: "icon",
                render: (_: any, record: any) => <Avatar src={record.icon}/>,
            },
            MyColumns.common({title: "Symbol", key1: "Symbol"}),
            MyColumns.common({title: "Name", key1: "name"}),
            MyColumns.address({title: "Address", key1: "address"}),
            MyColumns.common({title: "Cg Id", key1: "cd_id"}),
            MyColumns.common({title: "Market Cap Rank", key1: "market_cap_rank"}),
        ] as ProColumns<any, "text">[],
    };

    return (
        <>
            <PageContainer
                title="Coins"
                footer={[<MyPagination key="page" {...pagination} />]}
                content={
                    <ProCard>
                        <QueryFilter {...search}>
                            <ProFormText name="name" label="Name"/>
                            <ProFormText name="symbol" label="Symbol"/>
                            <ProFormText name="address" label="Address"/>
                        </QueryFilter>
                        <ProTable
                            {...table}
                            {...tableProps}
                            expandable={{defaultExpandAllRows: true}}
                        />
                    </ProCard>
                }
            />
        </>
    );
};
