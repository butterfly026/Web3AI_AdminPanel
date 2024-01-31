import {request} from "umi";
import {getDataFromParams, MyButtons, MyColumns, MyPagination, useListPage} from "@/common";
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
    const {modalRef, actions, params, pagination, search, table, setResData} = useListPage({
        baseUri: "users",
        otherApi: {
            list: () => {
                request("users/referral_list", getDataFromParams(params)).then(
                    (res: any) => {
                        modalRef.current?.hideModal();
                        setResData(res);
                    }
                );
            },
        },
    });

    const tableProps = {
        scroll: {x: "max-content", scrollToFirstRowOnChange: true},
        columns: [
            MyColumns.id,
            MyColumns.common({title: 'From User', key1: 'nickname'}),
            MyColumns.address({title: 'From Address', key1: 'address'}),
            MyColumns.common({title: 'Ref User', key1: 'parent_1', key2: 'nickname'}),
            MyColumns.address({title: 'Ref Address', key1: 'parent_1', key2: 'address'}),
            MyColumns.dateTime({title: 'Created At', key1: 'created_at'})
        ] as ProColumns<any, "text">[],
        toolBarRender: () => [],
    };

    return (
        <>
            <PageContainer
                title="转介"
                footer={[<MyPagination key="page" {...pagination} />]}
                content={
                    <ProCard>
                        <QueryFilter {...search}>
                            <ProFormText name="from_address" label="From Address"/>
                            <ProFormText name="to_adredss" label="To Address"/>
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
