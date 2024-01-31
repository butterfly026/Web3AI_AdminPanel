import {MyButtons, MyColumns, MyPagination, useListPage} from "@/common";
import {MyEnumFormSelect} from "@/common/components/MyEnumFormSelect";
import {JackpotsStatusEnum} from "@/enums";
import {UserOutlined} from "@ant-design/icons";
import {ProCard} from "@ant-design/pro-components";
import {ProFormSelect, ProFormText, QueryFilter} from "@ant-design/pro-form";
import {PageContainer} from "@ant-design/pro-layout";
import type {ProColumns} from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import {Avatar, Space, Typography} from "antd";
import {history} from "umi";

export default () => {
    const {modalRef, actions, params, pagination, search, table} = useListPage({
        baseUri: "jackpots",
        defaultParams: {
            s: { status: 'OnGoing' }
        }
    });

    const tableProps = {
        scroll: {x: "max-content", scrollToFirstRowOnChange: true},
        columns: [
            MyColumns.id,
            MyColumns.coin({title: "Goal", key1: "goal"}),
            MyColumns.coin({title: "Balance", key1: "balance"}),
            MyColumns.coin({title: "Send Airdrop", key1: "send_airdrop"}),
            {
                title: "Started",
                dataIndex: "started_at",
            },
            MyColumns.enumTag({
                title: "Status",
                key1: "status",
                items: JackpotsStatusEnum,
            }),
            {
                title: "Operate",
                key: "action",
                align: "right",
                valueType: "option",
                render: (_: any, item: any) => [
                    <MyButtons.ShowButton
                        key={"show_" + item.id}
                        onClick={() => {
                            history.push(`/jackpots/show/${item.id}/users`);
                        }}
                    />,
                ],
            },
        ] as ProColumns<any, "text">[],
        toolBarRender: () => [],
    };

    return (
        <>
            <PageContainer
                title="Prize Pool List"
                footer={[<MyPagination key="page" {...pagination} />]}
                content={
                    <ProCard>
                        <QueryFilter {...search}>
                            <MyEnumFormSelect
                                name="status"
                                label="Status"
                                value='OnGoing'
                                items={JackpotsStatusEnum}
                                placeholder='Status'
                            />
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
