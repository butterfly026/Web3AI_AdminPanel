import {MyButtons, MyColumns, MyPagination, useListPage} from "@/common";
import {
    PageContainer,
    ProCard,
    ProColumns,
    ProFormText,
    ProTable,
    QueryFilter,
} from "@ant-design/pro-components";
import {Tag, Space} from "antd";

export default () => {
    const {modalRef, actions, params, pagination, search, table} = useListPage({
        baseUri: "subscribes",
    });

    const tableProps = {
        scroll: {x: "max-content", scrollToFirstRowOnChange: true},
        columns: [
            MyColumns.id,
            {
                title: "Email",
                dataIndex: "email",
                sorter: true,
            },
            MyColumns.dateTime({title: 'Created At', key1: 'created_at'})
        ] as ProColumns<any, "text">[],
        toolBarRender: () => [],
    };

    return (
        <>
            <PageContainer
                title="订阅管理"
                footer={[<MyPagination key="page" {...pagination} />]}
                content={
                    <ProCard>
                        <QueryFilter {...search}>
                            <ProFormText name="email" label="Email"/>
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
